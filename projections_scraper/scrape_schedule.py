import csv
from datetime import datetime, timedelta
import os
import pytz
import requests
from bs4 import BeautifulSoup

from utils import get_schedule_storage_directory

nba_months = ['October', 'November', 'December', 'January', 'February', 'March', 'April']


def get_schedule_url(month: str) -> str:
    url = f'https://www.basketball-reference.com/leagues/NBA_2025_games-{month.lower()}.html'
    return url


def is_within_24_hours_of_month(current_date: datetime, month: str) -> bool:
    # Get the timezone-aware date for the start and end of the month
    est = pytz.timezone('America/New_York')
    year = current_date.year

    # Handle edge cases for January in a new year
    if month == "January" and current_date.month == 12:
        year += 1

    first_day = est.localize(datetime.strptime(f'{month} 1 {year}', '%B %d %Y'))
    last_day = (first_day + timedelta(days=32)).replace(day=1) - timedelta(days=1)

    # Check if the current date is within 24 hours of the month's start or end
    return abs((current_date - first_day).total_seconds()) <= 86400 or abs((current_date - last_day).total_seconds()) <= 86400


def fetch_and_save_schedule():
    # Get the current date and time in EST
    est = pytz.timezone('America/New_York')
    current_date = datetime.now(est)
    current_month = current_date.strftime("%B")

    schedule_dir = get_schedule_storage_directory()
    os.makedirs(schedule_dir, exist_ok=True)  # Ensure the directory exists

    for i in range(len(nba_months)):
        month = nba_months[i]

        is_current_month = month == current_month
        is_within_proximity = is_within_24_hours_of_month(current_date, month)

        csv_file_name = f'schedule_{month.lower()}.csv'
        csv_file_path = os.path.join(schedule_dir, csv_file_name)
        does_file_exist = os.path.exists(csv_file_path)

        if (does_file_exist and not (is_current_month or is_within_proximity)):
            print(f"File '{csv_file_name}' already exists or does not need updating. Skipping creation.")
            continue

        # Fetch the schedule HTML
        url = get_schedule_url(month)
        user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
        response = requests.get(url, headers={'User-Agent': user_agent})
        soup = BeautifulSoup(response.text, 'html.parser')

        target_div = soup.find(id='schedule')

        # Check if the schedule table exists
        if target_div:
            table_body = target_div.find('tbody')
            rows = table_body.find_all('tr', class_=lambda x: x != "thead")

            schedule_data = []

            for row in rows:
                # Extract game information
                date = row.find('th', {'data-stat': 'date_game'}).text
                start_time = row.find('td', {'data-stat': 'game_start_time'}).text
                visitor_team = row.find('td', {'data-stat': 'visitor_team_name'}).text
                visitor_score = row.find('td', {'data-stat': 'visitor_pts'}).text
                home_team = row.find('td', {'data-stat': 'home_team_name'}).text
                home_score = row.find('td', {'data-stat': 'home_pts'}).text
                box_score_cell = row.find('td', {'data-stat': 'box_score_text'})
                box_score_href = box_score_cell.find('a')['href'] if box_score_cell and box_score_cell.find('a') else ''
                overtime = row.find('td', {'data-stat': 'overtimes'}).text.strip() or 'No'
                attendance = row.find('td', {'data-stat': 'attendance'}).text
                game_duration = row.find('td', {'data-stat': 'game_duration'}).text
                arena = row.find('td', {'data-stat': 'arena_name'}).text

                if start_time.endswith('p'):
                    start_time = start_time[:-1] + ' PM'  # Remove 'p' and add ' PM'
                elif start_time[-1].isalpha():  # Check if the last character is a letter
                    start_time = start_time[:-1] + ' AM'

                # Combine date and time, convert to EST
                datetime_string = f"{date} {start_time}"
                game_datetime = datetime.strptime(datetime_string, '%a, %b %d, %Y %I:%M %p')
                game_datetime = pytz.timezone('US/Eastern').localize(game_datetime)

                # Rename teams if necessary
                if visitor_team == "Los Angeles Clippers":
                    visitor_team = "LA Clippers"
                if home_team == "Los Angeles Clippers":
                    home_team = "LA Clippers"

                # Append to schedule data
                schedule_data.append([
                    game_datetime.strftime('%Y-%m-%d %H:%M:%S'),
                    visitor_team,
                    visitor_score,
                    home_team,
                    home_score,
                    box_score_href,
                    overtime,
                    attendance,
                    game_duration,
                    arena
                ])

            # Write schedule data to a CSV file
            with open(csv_file_path, 'w', newline='', encoding='utf-8') as csvfile:
                csv_writer = csv.writer(csvfile)
                # Write header row with no spaces
                csv_writer.writerow([
                    'date_time_est', 'visitor_team', 'visitor_score',
                    'home_team', 'home_score', 'box_score_link',
                    'overtime', 'attendance', 'game_duration', 'arena'
                ])
                # Write game rows
                csv_writer.writerows(schedule_data)

            print(f"Schedule for {month} saved to '{csv_file_name}' in {schedule_dir}.")
        else:
            print(f"Failed to retrieve the schedule for {month}.")
            print(f"URL: {url}")


fetch_and_save_schedule()



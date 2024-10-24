import csv
from datetime import date, datetime
import os
import pytz
import requests
from bs4 import BeautifulSoup
from constants import TEAM_NAMES
from parse_html import parse_team_projections_from_html
from parse_over_under_data import get_over_under_picks, get_team_over_unders
from team_projection import TeamProjection  # Assuming TeamProjection is already defined in team_projection.py
def fetch_and_save_team_projections(overwrite=False):
    """
    Fetch team projections from ESPN and save to CSV. Optionally overwrite existing file.
    
    :param overwrite: Boolean indicating whether to overwrite an existing file. Default is False.
    """
    # URL of the webpage you want to scrape
    url = 'https://www.espn.com/nba/bpi/_/view/projections'
    
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

    # Send a GET request to the webpage
    response = requests.get(url, headers={'User-Agent': user_agent})

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Get the current date and time in EST
        est = pytz.timezone('America/New_York')
        current_date = datetime.now(est)

        # Define the CSV filename
        csv_file_name = f'team_projections_{current_date.strftime("%Y-%m-%d")}.csv'
        file_path = f"written_data/{csv_file_name}"

        # Parse the HTML and get team projections
        team_projections = parse_team_projections_from_html(response.text, current_date)

        if os.path.exists(file_path) and not overwrite:
            print(f"File '{csv_file_name}' already exists. Skipping creation.")
            return  # Exit without doing anything

        with open(file_path, mode='w', newline='') as csvfile:
            # CSV writer setup
            fieldnames = ['date_retrieved', 'team_name', 'current_w', 'current_l', 'proj_w', 'proj_l', 'win_div', 'playoff', 'top6', 'playin', 'proj_seed', 'proj_draft', 'first_pick']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            # Write the header only if the file is new or being overwritten
            writer.writeheader()

            # Write each TeamProjection object to CSV
            for projection in team_projections:
                writer.writerow({
                    'date_retrieved': projection.date_retrieved.strftime('%Y-%m-%d %H:%M:%S'),  # Full datetime with time
                    'team_name': projection.team_name,
                    'current_w': projection.current_w,
                    'current_l': projection.current_l,
                    'proj_w': projection.proj_w,
                    'proj_l': projection.proj_l,
                    'win_div': projection.win_div,
                    'playoff': projection.playoff,
                    'top6': projection.top6,
                    'playin': projection.playin,
                    'proj_seed': projection.proj_seed,
                    'proj_draft': projection.proj_draft,
                    'first_pick': projection.first_pick
                })
    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")

fetch_and_save_team_projections(overwrite=False)
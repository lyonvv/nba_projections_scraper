from datetime import timedelta
from jinja2 import Environment, FileSystemLoader

from email_renderers.render_team_row import render_team_rows
from parse_over_under_data import get_team_over_unders
from projections_utils import get_latest_daily_projection

def render_email_content(receiver_name, week_number):

    # Set up the Jinja2 environment and load templates
    env = Environment(loader=FileSystemLoader('./email_templates/'))
    template = env.get_template('weekly_email.j2')

    initial_team_over_unders = get_team_over_unders()

    latest_projection = get_latest_daily_projection()

    print(latest_projection)

    team_rows = render_team_rows(latest_projection.team_projections, initial_team_over_unders)

    #serialize and print latest projection

    # Define dynamic content for the email
    data = {
        'name': receiver_name,
        'weekNumber': week_number,
        'team_rows': team_rows,
    }

    # Render the HTML content with dynamic data
    html_content = template.render(data)
    return html_content

def weeks_since_start_of_season(current_date, season_start_date):
    days_to_next_monday = (7 - season_start_date.weekday()) % 7
    first_monday_after_start = season_start_date + timedelta(days=days_to_next_monday)

    # Calculate the difference in days between the current date and the first Monday
    days_difference = (current_date - first_monday_after_start).days

    # If the current date is before the season start date, weeks should be 0
    if current_date < season_start_date:
        return 0

    # If the current date falls within the first week (before the first Monday), return 1
    if current_date < first_monday_after_start:
        return 1

    # Otherwise, calculate the number of full weeks since the first Monday, starting from week 2
    weeks_difference = days_difference // 7 + 2
    return weeks_difference
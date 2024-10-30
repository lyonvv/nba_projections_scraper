from jinja2 import Environment, FileSystemLoader

from email_renderers.render_team_row import render_team_rows
from parse_over_under_data import get_team_over_unders
from projections_utils import get_latest_daily_projection

def render_email_content():

    # Set up the Jinja2 environment and load templates
    env = Environment(loader=FileSystemLoader('./email_templates/'))
    template = env.get_template('weekly_email.html')

    initial_team_over_unders = get_team_over_unders()

    latest_projection = get_latest_daily_projection()

    print(latest_projection)


    team_rows = render_team_rows(latest_projection.team_projections, initial_team_over_unders)

    #serialize and print latest projection


    # Define dynamic content for the email
    data = {
        'name': 'Lyon',
        'weekNumber': 2,
        'team_rows': team_rows,
    }

    # Render the HTML content with dynamic data
    html_content = template.render(data)
    return html_content

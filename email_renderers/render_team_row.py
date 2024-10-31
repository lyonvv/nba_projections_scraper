import base64
from jinja2 import Environment, FileSystemLoader
from wand.image import Image

from constants import TEAM_ABBREVIATIONS, TEAM_FULL_NAMES_LOOKUP

def render_team_rows(latest_team_projections, initial_over_unders): 
    env = Environment(loader=FileSystemLoader('./email_templates/'))
    template = env.get_template('team_row.j2')

    team_rows = ''

    for team_abbrev in TEAM_ABBREVIATIONS:
        team_full_name = TEAM_FULL_NAMES_LOOKUP[team_abbrev]

        team_projection = next((obj for obj in latest_team_projections if obj.team_name == team_full_name), None)

        team_over_under = next((obj for obj in initial_over_unders if obj.team_name == team_full_name), None)

        team_over_under_line = team_over_under.over_under_line

        projected_wins = team_projection.proj_w
        current_wins = team_projection.current_w
        current_losses = team_projection.current_l

        svg_file_path = f"./nba_team_logos/{team_abbrev}_logo.svg"

        with (open(svg_file_path, "rb")) as f:
            svg = f.read()
    
        team_logo_svg_b64encoded = base64.b64encode(svg).decode('utf-8')
        
        current_delta = float(projected_wins) - float(team_over_under_line)

        rounded_current_delta = round(current_delta, 1)

        data = {
            'full_name': team_full_name,
            'team_logo_svg_b64encoded': team_logo_svg_b64encoded,
            'current_wins': current_wins,
            'current_losses': current_losses,
            'proj_wins': projected_wins,
            'over_under_line': team_over_under_line,
            'tracking': 'Even' if rounded_current_delta == 0 else 'Under' if rounded_current_delta < 0 else 'Over',
            'current_delta': rounded_current_delta
        }

        row = template.render(data)

        team_rows += row

    print(team_rows)

    return team_rows
        
   
from datetime import datetime
from bs4 import BeautifulSoup

from team_projection import TeamProjection


def parse_team_projections_from_html(html_string, current_date):

    soup = BeautifulSoup(html_string, 'html.parser')

    target_div = soup.find('div', class_=['PowerIndex__Table--projections', 'league-nba'])

    # Check if the div was found and print its content
    if target_div:
        # Find all tables within the div (including nested ones)
        tables = target_div.find_all('table')

        # Ensure there are two tables
        if len(tables) != 2:
            print('Expected 2 tables, but found', len(tables))
            exit()
        
        # Get the first table (team names)
        table = tables[0]
        table_body = table.find('tbody')
        rows = table_body.find_all('tr')

        # Extract team names from the first table
        team_names = [row.find('td').text for row in rows]

        # Get the second table (projections)
        table = tables[1]
        table_body = table.find('tbody')
        rows = table_body.find_all('tr')

        # Verify header row
        expected_headers = ['W-L', 'OVR W-L', 'WIN DIV%', 'PLAYOFF%', 'TOP6%', 'PLAYIN%', 'PROJ SEED', 'PROJ DRAFT', '1ST PICK%']
        
        # Get the header row
        header_row = table.find('thead').find_all('th')
        headers = [header.get_text(strip=True) for header in header_row]

        # Check if the headers match the expected ones
        if headers != expected_headers:
            print("Headers do not match the expected format!")
            print(f"Expected: {expected_headers}")
            print(f"Found: {headers}")
            exit()

        # If the headers match, process the rows and create TeamProjection objects
        team_projections = []

        for row_index, row in enumerate(rows):
            cells = row.find_all('td')
            row_data = [cell.get_text(strip=True) for cell in cells]

            # Create TeamProjection objects based on the row data and team names
            if len(row_data) == 9:  # Ensure the row has 9 columns
                current_wl = row_data[0].split('-')
                proj_wl = row_data[1].split('-')

                team_obj = TeamProjection(
                    date_retrieved=current_date,  # Date Retrieved
                    team_name=team_names[row_index],  # Match the team name
                    current_w=current_wl[0],     # Current Wins         
                    current_l=current_wl[1],     # Current Losses
                    proj_w=proj_wl[0],           # Projected Wins
                    proj_l=proj_wl[1],           # Projected Losses
                    win_div=row_data[2],         # WIN DIV%
                    playoff=row_data[3],         # PLAYOFF%
                    top6=row_data[4],            # TOP6%
                    playin=row_data[5],          # PLAYIN%
                    proj_seed=row_data[6],       # PROJ SEED
                    proj_draft=row_data[7],      # PROJ DRAFT
                    first_pick=row_data[8]       # 1ST PICK%
                )
                team_projections.append(team_obj)

        return team_projections
    else:
        print("Target div not found!")
        exit()


    
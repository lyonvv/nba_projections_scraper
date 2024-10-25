import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin

from constants import TEAM_FULL_NAMES_LOOKUP, TEAM_FULL_NAMES

# URL of the page containing team logos
url = "https://www.nba.com/teams"  # Replace with the actual URL

# Directory to save SVG files
output_dir = "nba_team_logos"
os.makedirs(output_dir, exist_ok=True)

# Fetch the page
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# Iterate over images in the page
for img in soup.find_all("img"):


    title = img.get("title", "")
    
    # Check if the title contains any team name followed by "Logo"
    if any(f"{team} Logo" in title for team in TEAM_FULL_NAMES):
        img_src = img.get("src")
        
        # Check if the image src is an SVG
        if img_src and img_src.endswith(".svg"):
            # Build the full URL for the image
            
            # Get the team name from the title for filename
            team_name = title.split(" Logo")[0]

            if team_name not in TEAM_FULL_NAMES:
                print(f"Skipping {team_name} logo download as it's not in the lookup.")
                continue

            team_abbreviation = TEAM_FULL_NAMES_LOOKUP.get(team_name)

            file_path = os.path.join(output_dir, f"{team_abbreviation}_logo.svg")

            # Download and save the SVG
            img_response = requests.get(img_src)
            with open(file_path, "wb") as file:
                file.write(img_response.content)
            
            print(f"Downloaded {team_name} logo to {file_path}")

print("Download completed!")

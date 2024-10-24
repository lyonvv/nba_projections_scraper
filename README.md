# nba_projections_scraper

Scrapes ESPN's BPI Projections to Produce an Updating Scoreboard of Our NBA Picks

## Setting Up Ditigal Ocean Droplet

Setting up the (Ubuntu) droplet in Digital Ocean involves creating a SSH key inside the droplet.
The private key needs to be copied and placed into

## Pulling files from Digital Ocean Volume

To pull the files from the volume storage (if testing locally), simply run the following from your desktop:

scp -r root@[IP_ADDRESS]:/mnt/external/projections/\* ~/Source/nba_projections_scraper/written_data/
team_projections_2024-10-24.csv

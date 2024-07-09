import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.patches import Circle
from PIL import Image, ImageDraw, ImageFont

# Load your data
data = pd.read_csv('../backend/uploads/gps_test_gabgal.csv')  # Replace with the path to your CSV file

# Data analysis
value_counts = data['scientific_name'].value_counts()
most_abundant = value_counts.idxmax()
least_abundant = value_counts.idxmin()
most_abundant_count = value_counts.max()
least_abundant_count = value_counts.min()

highest_height = data.groupby('scientific_name')['height'].max()
tallest_species = highest_height.idxmax()
tallest_value = highest_height.max()

lowest_height = data.groupby('scientific_name')['height'].min()
shortest_species = lowest_height.idxmin()
shortest_value = lowest_height.min()

highest_width = data.groupby('scientific_name')['width'].max()
lowest_width = data.groupby('scientific_name')['width'].min()

# Calculate the species with the tallest height and shortest height
tallest_species = highest_height.idxmax()
shortest_species = lowest_height.idxmin()

# Calculate the species with the thickest width and slimmest width
thickest_species = highest_width.idxmax()
thickest_value = highest_width.max()

slimmest_species = lowest_width.idxmin()
slimmest_value = lowest_width.min()

# Calculate the species with the highest and lowest carbon sequestration
highest_carbon_seq = data.groupby('scientific_name')['carbon_seq'].max()
highest_carbon_species = highest_carbon_seq.idxmax()
highest_carbon_value = highest_carbon_seq.max()

lowest_carbon_seq = data.groupby('scientific_name')['carbon_seq'].min()
lowest_carbon_species = lowest_carbon_seq.idxmin()
lowest_carbon_value = lowest_carbon_seq.min()

# Calculate the overall highest and lowest total carbon sequestration for each scientific name
total_carbon_seq = data.groupby('scientific_name')['carbon_seq'].sum()
highest_total_carbon_seq_name = total_carbon_seq.idxmax()
lowest_total_carbon_seq_name = total_carbon_seq.idxmin()

# Calculate total carbon sequestration
total_carbon_seq = data['carbon_seq'].sum()

print(f"Most abundant species: {most_abundant} with {most_abundant_count} individuals")
print(f"Least abundant species: {least_abundant} with {least_abundant_count} individuals")
print(f"Tallest species: {tallest_species} with a height of {tallest_value} meters")
print(f"Shortest species: {shortest_species} with a height of {shortest_value} meters")
print(f"Thickest species: {thickest_species} with a width of {thickest_value} meters")
print(f"Slimmest species: {slimmest_species} with a width of {slimmest_value} meters")
print(f"Species with highest carbon sequestration: {highest_total_carbon_seq_name} with {highest_carbon_value} units")
print(f"Species with lowest carbon sequestration: {lowest_total_carbon_seq_name} with {lowest_carbon_value} units")
print(f"Total carbon sequestered by all species: {total_carbon_seq} units")

def add_line_breaks(text):
    return text.replace(' ', '\n')

image_path = '../backend/uploads/SummaryConceptNMS.jpeg'
image = Image.open(image_path)

# Prepare to draw on the image
draw = ImageDraw.Draw(image)

# Define font - the path may need to be changed to an actual .ttf file on your system
# If you don't have a font file, you can remove the font argument, and a default font will be used
try:
    font = ImageFont.truetype("Arial", size=20)
except IOError:
    font = ImageFont.load_default()

# Values from data analysis (example values used here, you should replace them with actual results)
texts = {
    'Most Carbon Sequestered': highest_total_carbon_seq_name,
    'Highest Carbon Value': f"{highest_carbon_value}units",  # Assuming you want to add " units" for consistency
    'Least Carbon Sequestered': lowest_total_carbon_seq_name,
    'Lowest Carbon Value': f"{lowest_carbon_value}units",  # Assuming you want to add " units" for consistency
    'Tallest Tree': tallest_species,
    'Tallest Value': f"{tallest_value}m",  # Adding " meters" to the value
    'Shortest Tree': shortest_species,
    'Shortest Value': f"{shortest_value}m",  # If you also want to add " meters" to shortest_value
    'Thickest Tree': thickest_species,
    'Thickest Value': f"{thickest_value}m",  # Similarly adding " meters" for consistency
    'Slimmest Tree': slimmest_species,
    'Slimmest Value': f"{slimmest_value}m",  # Adding " meters" for slimmest_value
    'Most Abundant': most_abundant,
    'Least Abundant': least_abundant,
    'Total carbon sequestered': f"{total_carbon_seq:.2f} units"  # Adding " units" for clarity
}


# Coordinates for the text (example coordinates, you should adjust them based on your image)
coordinates = {
    'Most Carbon Sequestered': (180, 140),
    'Highest Carbon Value': (190, 195),
    'Least Carbon Sequestered': (910, 150),
    'Lowest Carbon Value': (920, 200),
    'Tallest Tree': (170, 290),
    'Tallest Value': (170, 340),
    'Shortest Tree': (1010, 260),
    'Shortest Value': (1010,310),
    'Thickest Tree': (215, 440),
    'Thickest Value': (215, 490),
    'Slimmest Tree': (1080, 415),
    'Slimmest Value': (1080, 465),
    'Most Abundant': (340, 600),
    'Least Abundant': (1080, 600),
    'Total carbon sequestered': (300, 50) # Example coordinate at the bottom of the tree
}

# Draw the text on the image
for text, coord in coordinates.items():
    display_text = add_line_breaks(str(texts[text]))
    draw.text(coord, display_text, fill="black", font=font)


# Save the edited image
edited_image_path = '../backend/uploads/summary_tree.png'
image.save(edited_image_path)
edited_image_path
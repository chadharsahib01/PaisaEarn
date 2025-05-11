import os
import zipfile

# Define the project structure
structure = {
    "HamsterGame": {
        "css": ["styles.css"],
        "js": ["animations.js", "audio.js", "game.js", "gsap.min.js", "lottie.min.js", "pwa.js"],
        "assets": {
            "audio": ["background-music.mp3", "click.mp3", "coin.mp3", "upgrade.mp3"],
            "images": ["background.svg", "coin.svg", "level.svg"],
            "icons": ["auto-click.svg", "click-power.svg", "close.svg", "dark-theme.svg", 
                      "icon-192.png", "icon-512.png", "light-theme.svg", "menu.svg", 
                      "sound-off.svg", "sound-on.svg", "favicon.ico"],
            "animations": ["hamster-idle.json", "hamster-idle.svg", "hamster-intro.svg", "loading.svg"],
            "fonts": ["Poppins-Bold.ttf", "Poppins-Regular.ttf"]
        },
        "index.html": None,
        "manifest.json": None
    }
}

# Create directories and files
def create_structure(base_path, structure):
    for name, content in structure.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        elif isinstance(content, list):
            os.makedirs(path, exist_ok=True)
            for file in content:
                open(os.path.join(path, file), 'a').close()
        else:
            open(path, 'a').close()

# Create zip file
def create_zip(folder_name, zip_name):
    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(folder_name):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, os.path.dirname(folder_name))
                zipf.write(file_path, arcname)

# Execute
base_dir = "HamsterGame"
create_structure(".", structure)
create_zip(base_dir, "HamsterGame.zip")

print("Zip file 'HamsterGame.zip' created successfully!")
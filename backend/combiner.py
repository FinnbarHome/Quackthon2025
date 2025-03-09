import os

# Define directories to search
ROOT_DIR = os.getcwd()
TARGET_DIRECTORIES = ["models", "middleware", "routes", "api"]
OUTPUT_FILE = "all_js_files.txt"

def get_js_files(directory, recursive=True):
    """Retrieve .js files from a directory.
    - If recursive is False, only gets files in the direct folder (no subfolders).
    - If recursive is True, searches all subdirectories.
    """
    js_files = []
    
    if recursive:  # Recursive search for subdirectories
        for root, _, files in os.walk(directory):
            for file in files:
                if file.endswith(".js"):
                    js_files.append(os.path.join(root, file))
    else:  # Only look at direct files in the folder (no subfolders)
        for file in os.listdir(directory):
            if file.endswith(".js") and os.path.isfile(os.path.join(directory, file)):
                js_files.append(os.path.join(directory, file))

    return js_files

def write_js_to_file(output_file):
    """Writes the content of all .js files to a text file."""
    with open(output_file, "w", encoding="utf-8") as out_file:
        # Get .js files in root directory (but NOT in subfolders)
        root_js_files = get_js_files(ROOT_DIR, recursive=False)
        for js_file in root_js_files:
            try:
                with open(js_file, "r", encoding="utf-8") as f:
                    out_file.write(f"\n--- {js_file} ---\n")
                    out_file.write(f.read() + "\n\n")
            except Exception as e:
                print(f"Could not read {js_file}: {e}")

        # Get .js files from specified subdirectories (including their subfolders)
        for directory in TARGET_DIRECTORIES:
            abs_path = os.path.join(ROOT_DIR, directory)
            if os.path.exists(abs_path):
                js_files = get_js_files(abs_path, recursive=True)
                for js_file in js_files:
                    try:
                        with open(js_file, "r", encoding="utf-8") as f:
                            out_file.write(f"\n--- {js_file} ---\n")
                            out_file.write(f.read() + "\n\n")
                    except Exception as e:
                        print(f"Could not read {js_file}: {e}")

if __name__ == "__main__":
    write_js_to_file(OUTPUT_FILE)
    print(f"All JavaScript files have been written to {OUTPUT_FILE}")

import os

# Define root directory and output file
ROOT_DIR = os.getcwd()
OUTPUT_FILE = "all_js_files.txt"


def get_js_files(directory):
    """Retrieve .js files from the directory and its subdirectories,
    excluding anything inside 'node_modules'. Also includes package.json.
    """
    js_files = []

    for root, _, files in os.walk(directory):
        # Skip node_modules directory
        if "node_modules" in root.split(os.sep):
            continue

        for file in files:
            if file.endswith(".js") or file == "package.json":
                js_files.append(os.path.join(root, file))

    return js_files


def write_js_to_file(output_file):
    """Writes the content of all .js files and package.json to a text file."""
    with open(output_file, "w", encoding="utf-8") as out_file:
        js_files = get_js_files(ROOT_DIR)
        for js_file in js_files:
            try:
                with open(js_file, "r", encoding="utf-8") as f:
                    out_file.write(f"\n--- {js_file} ---\n")
                    out_file.write(f.read() + "\n\n")
            except Exception as e:
                print(f"Could not read {js_file}: {e}")


if __name__ == "__main__":
    write_js_to_file(OUTPUT_FILE)
    print(f"All JavaScript and package.json files have been written to {OUTPUT_FILE}")

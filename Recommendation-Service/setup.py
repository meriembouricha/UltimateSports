import subprocess
import sys
import argparse
import os

def start_server():
    print("🚀 Starting FastAPI server with auto-reload...")
    subprocess.run(["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"])

def start_scheduler():
    print("⏰ Starting scheduled model retrain loop...")
    subprocess.run([sys.executable, "scheduled_retrain.py"])

def main():
    parser = argparse.ArgumentParser(description="Dev Utility Launcher")
    parser.add_argument("command", choices=["server", "retrain"], help="Choose to run the API server or scheduled retrainer")
    args = parser.parse_args()

    if args.command == "server":
        start_server()
    elif args.command == "retrain":
        start_scheduler()
    else:
        print("❌ Unknown command")

if __name__ == "__main__":
    main()

#!/bin/bash
echo "Installing Git LFS..."
apt-get update && apt-get install git-lfs -y
git lfs install
git lfs pull
echo "Git LFS files pulled successfully."

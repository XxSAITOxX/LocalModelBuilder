FROM python:3.11-slim

WORKDIR /app

# 必要パッケージ
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# pip更新
RUN pip install --upgrade pip

# PyTorch (CUDA 12.8)
RUN pip3 install torch torchvision \
    --index-url https://download.pytorch.org/whl/cu128

# その他ライブラリ
COPY requirements.txt .
RUN pip install -r requirements.txt

# ソースコピー
COPY . .

EXPOSE 8000

# 環境構築用: アプリコードが未作成でもコンテナを起動したままにする
CMD ["tail", "-f", "/dev/null"]

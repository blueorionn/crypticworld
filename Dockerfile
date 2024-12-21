# Use debian-slim as the base image
FROM debian:12-slim

# create directory for the app user
RUN mkdir -p /home/app

# create the app user and app group
RUN addgroup --system app && adduser --system --group app

# create the appropriate directories
ENV HOME=/home/app
ENV APP_DIR=/home/app/project
RUN mkdir $APP_DIR
WORKDIR $APP_DIR

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV FLASK_ENV="deployment"
ENV VIRTUAL_ENV=/home/app/project/.venv
ENV PATH="/home/app/project/.venv/bin:$PATH"

# install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-venv \
    python3-pip \
    build-essential \
    curl \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# copy project
COPY . $APP_DIR

# chown all the files to the app user
RUN chown -R app:app $APP_DIR

# change to the app user
USER app

# creating virtual environment
RUN python3 -m venv $VIRTUAL_ENV

# Install Python dependencies in the virtual environment
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8000

# Start Gunicorn
CMD ["gunicorn", "wsgi:application", "--bind", "0.0.0.0:8000"]
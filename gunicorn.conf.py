# gunicorn.conf.py
import multiprocessing

# Worker Configuration
workers = max(int(multiprocessing.cpu_count() * 2 + 1), 1)
worker_class = "sync"
threads = 2
worker_connections = 1000

# Networking
bind = "0.0.0.0:8000"
forwarded_allow_ips = "*"
proxy_protocol = True
proxy_allow_ips = "*"

# Timeout Configuration
timeout = 120
keepalive = 65
graceful_timeout = 120

# Server Mechanics
preload_app = True
reload = False
max_requests = 1000
max_requests_jitter = 50

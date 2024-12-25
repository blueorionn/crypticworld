"""Utility functions"""

from .data import algorithms


def available_algorithms() -> list[str]:
    """Return list of available algorithms."""
    
    return [algo['name'] for algo in algorithms]

def get_algorithm(algorithm_name):
    """Return matching algorithm name object from algorithms array."""

    if algorithm_name not in available_algorithms():
        raise ValueError(f"Unkown algorithm {algorithm_name}")
    
    for algo in algorithms:
        if algo['name'] == algorithm_name:
            return algo
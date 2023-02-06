from . import models


def environment():
    """
    This is not how you would want to handle environments in a real project,
    but for the sake of simplicity I'll create this function.

    Look at using environment variables or dotfiles for these.
    """
    return {
        "app": {"name": "mystripeapp.local", "port": "5200", "secret": "my_super_secret_key"},
        "billing": {"stripe": {"token": "pk_test_51MY9kqInUkX6rmARoA9vDc3szo79WRwBxJ5oKSBNmbdrE4Q0Ahdif3UYs7LRboTILmiLrHQU82Xoa4xsIhn9Nmib009ZxpvuTJ", "product": "price_1MYTnnInUkX6rmARusjyTfXB"}},
        "database": {
            "provider": "mysql",
            "host": "mysql",
            "port": "3306",
            "username": "root",
            "password": "toor",
            "database": "web_extension",
        },
    }

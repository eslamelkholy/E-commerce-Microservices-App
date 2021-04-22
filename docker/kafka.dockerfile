FROM wurstmeister/kafka:latest

LABEL author="Eslam Elkholy"
WORKDIR /var/www/boilerplate


# To build:
# docker build -f node.development.dockerfile --tag boilerplatetest ../

# To run:
# docker run -p 4000:4000 boilerplatetest
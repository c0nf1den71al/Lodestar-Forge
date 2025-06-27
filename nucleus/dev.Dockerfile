FROM node:latest

RUN apt update && apt -y install gnupg software-properties-common netcat-traditional unzip pipx

# Install terraform
RUN wget -O- https://apt.releases.hashicorp.com/gpg | \
    gpg --dearmor | \
    tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null
RUN echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
    https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
    tee /etc/apt/sources.list.d/hashicorp.list
RUN apt update && apt install terraform

# Install AWS CLI
RUN ARCH=$(dpkg --print-architecture) && \
    if [ "$ARCH" = "amd64" ]; then \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" ; \
    elif [ "$ARCH" = "arm64" ]; then \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"; \
    else \
    echo "Unsupported architecture: $ARCH" && exit 1; \
    fi && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf aws awscliv2.zip

# Install Ansible
RUN pipx ensurepath
RUN pipx install --include-deps ansible

# Install Tailscale
RUN curl -fsSL https://pkgs.tailscale.com/stable/debian/$(. /etc/os-release && echo "$VERSION_CODENAME").noarmor.gpg | tee /usr/share/keyrings/tailscale-archive-keyring.gpg > /dev/null && \
    curl -fsSL https://pkgs.tailscale.com/stable/debian/$(. /etc/os-release && echo "$VERSION_CODENAME").tailscale-keyring.list | tee /etc/apt/sources.list.d/tailscale.list > /dev/null && \
    apt update && \
    apt install -y tailscale

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm i

# This is seperate due to cross compilation issues
RUN npm i esbuild-register

COPY . .

# Note: Don't expose ports here, Compose will handle that for us

CMD ["sh", "/app/entrypoint.dev.sh"]

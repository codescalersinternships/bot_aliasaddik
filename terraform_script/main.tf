terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
    }
  }
}

provider "grid" {
    mnemonics = "relief replace patrol sibling broom real certain drastic fringe truck source certain"
    network = "dev"
}

resource "grid_network" "myBotAS" {
    nodes = [13]
    ip_range = "10.1.0.0/16"
    name = "bot_network"
    add_wg_access = true
}
resource "grid_deployment" "BotVmAS" {
  node = 13
  network_name = grid_network.myBotAS.name
  ip_range = lookup(grid_network.myBotAS.nodes_ip_range, 13, "")
  vms {
    name = "tfgrid_bot"
    flist = "https://hub.grid.tf/aliasaddik.3bot/aliasaddik-quotebot-latest.flist"
    cpu = 2 
    publicip = true
    memory = 4096
    env_vars = {
      SSH_KEY = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDZq8wcvuCH6y08pgnN2h+hZ9XIyJkfOYcE8DKOxD/i9+Cifj51o+v2iQVXy5kR1HY4OxnCZijqUBfjWh9PZ0Blvg8qZYBHx3N7xV3x8PNiVzPI399L2JQI73QNvdpLSSVu0eSiaiRZuohiX9+9SsIuUPsAiBL1iE6dj0ik10HnaZM99WjNX2Pk2ZnI3CLv/X5SzAEx/aKIdsPlfv19j2PhtbT8Xb4CeYLla6xDvUP/fupoTZTjLPBHWRuzqNtniwoknoljK1P6kRHsFFG85Rg3+BfbiSDqYUWOW4MthMmPjYUotyd+KnTgiaSgEi7ZFN7l/X8FcLCAaFskqJCoqO/b aliasaddik@aliasaddik-VirtualBox"
    }
    planetary = true
  }
  
}

output "public_ip" {
    value = grid_deployment.BotVmAS.vms[0].computedip
}
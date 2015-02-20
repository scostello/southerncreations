# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.network "private_network", ip: "192.168.50.50"

  config.vm.synced_folder ".", "/opt/southerncreations"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = 512
    vb.cpus = 1
  end

  config.vm.provision "docker"

  config.vm.provision "shell",
    :path => "config/build.sh",
    run: "always"
end

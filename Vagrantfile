# -*- mode: ruby -*-
# vi: set ft=ruby :

require "yaml"
vconfig = YAML.load(File.open(File.join(File.dirname(__FILE__), "vagrant.yml"), File::RDONLY).read)

Vagrant.configure(2) do |config|

    config.vm.define vconfig['VAGRANT_BOX_NAME'] do |m|

        # set up basic box image
        m.vm.box = "ubuntu/trusty64"

        m.vm.synced_folder ".", "/opt/southerncreations"

        # set host name
        m.vm.hostname = vconfig['VAGRANT_HOST_NAME']

        # set private network, machine will use this ip
        m.vm.network "private_network", ip: vconfig['VAGRANT_HOST_IP']
        #m.vm.network "forwarded_port", guest: 80, host: 8080

        m.vm.provision "ansible" do |ansible|
            ansible.playbook = "config/dev.yml"
            ansible.groups = {
                "vagrant" => ["default"]
            }
            ansible.verbose = "vvvv"
        end

    end

end

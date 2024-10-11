Vagrant.configure("2") do |config|
    config.vm.define "postgresql" do |postgresql|
      postgresql.vm.box = "ubuntu/bionic64"
      postgresql.vm.network "private_network", type: "dhcp"
      postgresql.vm.network "forwarded_port", guest: 5432, host: 1234 
      postgresql.vm.hostname = "postgresql.vm"
      postgresql.vm.provider "virtualbox" do |vb|
        vb.memory = "1024"
        vb.cpus = 2
      end
      postgresql.vm.provision "ansible" do |ansible|
        ansible.playbook = "playbooks/playbook-postgresql.yml"
        ansible.limit = "all"
      end
    end

    config.vm.define "mongodb" do |mongodb|
      mongodb.vm.box = "ubuntu/bionic64"
      mongodb.vm.network "private_network", type: "dhcp"
      mongodb.vm.network "forwarded_port", guest: 27017, host: 12345 
      mongodb.vm.hostname = "mongodb.vm"
      mongodb.vm.provider "virtualbox" do |vb|
        vb.memory = "1024"
        vb.cpus = 2
      end
      mongodb.vm.provision "ansible" do |ansible|
        ansible.playbook = "playbooks/playbook-mongodb.yml"
        ansible.limit = "all"
      end
    end
  
  end
  
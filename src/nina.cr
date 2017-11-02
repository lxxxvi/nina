require "./nina/*"
require "./nina/services/*"
require "kemal"

get "/" do
  render "./src/views/layouts/application.ecr"
end

ws "/socket" do |socket|
  socket.on_message do |message|
    hostname = message.strip.split(' ').first
    service = SslCertificateService.new hostname
    valid_until = service.valid_until
    json_result = {hostname: hostname, valid_until: valid_until}.to_json
    socket.send "#{json_result}"
  end
end

Kemal.run

require "./nina/*"
require "./nina/services/*"
require "kemal"

get "/" do
  render "./src/views/layouts/application.ecr"
end

ws "/socket" do |socket|
  socket.on_message do |message|
    action, params = "#{message} ".split(' ')

    if action == "CHECK"
      content = check(params)
    elsif action == "GET"
      content = TargetsService.new.targets
    elsif action == "REFRESH"
      content = RefreshService.new.refresh
    end

    response = {
      action:  action,
      content: content,
    }

    socket.send "#{response.to_json}"
  end
end

def check(params)
  hostname = params.strip.split(' ').first
  service = SslCertificateService.new hostname
  service.result
end

Kemal.run

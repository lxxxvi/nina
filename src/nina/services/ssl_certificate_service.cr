require "http/client"

class SslCertificateService
  # 2001-02-03T04:05:06+0700
  RFC2822_FORMAT = "%Y-%m-%dT%H:%m:%S%z"

  property hostname : String
  property certificate : String
  property exit_status : Process::Status

  def initialize(hostname : String)
    @hostname = hostname
    @certificate = `#{linux_system_command}`
    @exit_status = $?
  end

  def result
    {
      status:      status,
      hostname:    hostname,
      valid_until: valid_until,
    }
  end

  def status
    if exit_status.exit_status == 0
      :success
    else
      :failure
    end
  end

  def success?
    status == :success
  end

  def linux_system_command
    "echo | openssl s_client -showcerts -servername #{hostname} -connect #{hostname}:443 2>/dev/null | openssl x509 -inform pem -noout -text"
  end

  def not_after
    certificate[/Not After.*/]
  end

  def clean_not_after
    not_after.strip.gsub(/Not After \: /, "")
  end

  def valid_until
    return unless success?
    Time
      .parse(clean_not_after, "%b %d %H:%M:%S %Y", Time::Kind::Utc)
      .to_s(RFC2822_FORMAT)
  end
end

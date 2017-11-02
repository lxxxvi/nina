require "http/client"

class SslCertificateService
  # 2001-02-03T04:05:06+0700
  RFC2822_FORMAT = "%Y-%m-%dT%H:%m:%S%z"

  property hostname : String

  def initialize(@hostname)
  end

  def linux_system_command
    "echo | openssl s_client -showcerts -servername #{hostname} -connect #{hostname}:443 2>/dev/null | openssl x509 -inform pem -noout -text"
  end

  def not_after
    `#{linux_system_command} | grep After`
  end

  def clean_not_after
    not_after.strip.gsub(/Not After \: /, "")
  end

  def valid_until
    Time
      .parse(clean_not_after, "%b %d %H:%M:%S %Y", Time::Kind::Utc)
      .to_s(RFC2822_FORMAT)
  end
end

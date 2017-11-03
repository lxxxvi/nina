class RefreshService
  property targets_service : TargetsService

  def initialize
    @targets_service = TargetsService.new
  end

  def refresh
    targets_service.targets.each do |target|
      valid_until = valid_until_for target[:hostname]
      update_file target[:file_path], valid_until
    end
  end

  def valid_until_for(hostname)
    ssl_certificate_service = SslCertificateService.new(hostname)
    ssl_certificate_service.result[:valid_until]
  end

  def update_file(file_path, valid_until)
    File.write file_path, valid_until
  end
end

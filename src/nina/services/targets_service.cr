class TargetsService
  TARGETS_DIRECTORY_PATH = "./public/targets"
  RFC2822_FORMAT         = "%Y-%m-%dT%H:%m:%S%z"

  def targets
    target_file_paths.map do |target_file_path|
      {
        file_path:   target_file_path,
        hostname:    read_hostname(target_file_path),
        valid_until: read_valid_until(target_file_path),
        checked_at:  read_checked_at(target_file_path),
      }
    end
  end

  def target_file_paths
    Dir.glob "#{TARGETS_DIRECTORY_PATH}/*.txt"
  end

  def read_hostname(file_path)
    file_path.split("/").last.gsub(/\.txt$/, "")
  end

  def read_valid_until(file_path)
    content = File.read file_path
    return if content.blank?
    Time.parse(content, RFC2822_FORMAT, Time::Kind::Utc) # TODO: Format
  end

  def read_checked_at(file_path)
    File.stat(file_path).mtime
  end
end

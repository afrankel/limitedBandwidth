worker_processes 4
preload_app true
timeout 180
listen 3000

after_fork do |server, worker|
  ActiveRecord::Base.establish_connection
end
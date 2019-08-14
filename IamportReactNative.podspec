require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "IamportReactNative"
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.author       = package['author']
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/iamport/iamport-react-native.git", :tag => "master" }
  s.source_files  = "IamportReactNative/**/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"

end
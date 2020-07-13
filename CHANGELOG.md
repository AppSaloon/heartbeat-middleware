# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2020-07-13

### Changed

- updated dependencies
- moved the build script to a new build/ directory
- updated build script to transpile with babel
- updated build script to exclude package-lock.json
- refactored source code to use classes
- stopped assuming /status is the route name in the clients, this has to be specified in the service's options now.
- updated the README.md
- updated linting

### Added

- support for route dependencies in the options
- named import: "heartbeatMiddlewareClient" for clients
- added demo setup

## [1.0.9] - 2020-04-06

### Changed

- update dependencies

### Added

- linting
- changelog

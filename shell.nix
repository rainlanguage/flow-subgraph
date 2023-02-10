let
  pkgs = import
    (builtins.fetchTarball {
      name = "nixos-unstable-2021-10-01";
      url = "https://github.com/nixos/nixpkgs/archive/d3d2c44a26b693293e8c79da0c3e3227fc212882.tar.gz";
      sha256 = "0vi4r7sxzfdaxzlhpmdkvkn3fjg533fcwsy3yrcj5fiyqip2p3kl";
    })
    { };

  compile = pkgs.writeShellScriptBin "compile" ''
    hardhat compile
  '';
  prettier-check = pkgs.writeShellScriptBin "prettier-check" ''
    prettier --check .
  '';

  prettier-write = pkgs.writeShellScriptBin "prettier-write" ''
    prettier --write .
  '';

  flush-all = pkgs.writeShellScriptBin "flush-all" ''
    rm -rf artifacts
    rm -rf cache
    rm -rf node_modules
  '';

  init = pkgs.writeShellScriptBin "init" ''
    mkdir -p contracts && cp -r  node_modules/@rainprotocol/rain-protocol/contracts/* contracts/
    mkdir -p utils && cp -r  node_modules/@rainprotocol/rain-protocol/utils/* utils/
    compile
  '';


in
pkgs.stdenv.mkDerivation {
  name = "shell";
  buildInputs = [
    pkgs.nixpkgs-fmt
    pkgs.yarn
    pkgs.nodejs-16_x
    pkgs.slither-analyzer
    prettier-check
    prettier-write
    flush-all
    init
    compile
  ];

  shellHook = ''
    export PATH=$( npm bin ):$PATH
    # keep it fresh
    npm i
  '';
}
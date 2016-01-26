var mocha = require("mocha")
var assert = require("assert")
var bb = require("../index")

describe("bitbucket-url-to-object", function() {

  describe("shorthand", function(){

    it("supports user/repo style", function(){
      var obj = bb("user/repo#branch")
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
    })

    it("supports user/repo#branch style", function(){
      var obj = bb("user/repo#branch")
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
      assert.equal(obj.branch, 'branch')
    })

    it("defaults to master branch", function(){
      var obj = bb("user/repo")
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
      assert.equal(obj.branch, 'master')
    })

  })

  describe("mediumhand", function(){

    it("supports bitbucket:user/repo style", function(){
      var obj = bb("user/repo#branch")
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
    })

    it("supports bitbucket:user/repo#branch style", function(){
      var obj = bb("user/repo#branch")
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
      assert.equal(obj.branch, 'branch')
    })

    it("defaults to master branch", function(){
      var obj = bb("bitbucket:user/repo")
      assert.equal(obj.user, 'user')
      assert.equal(obj.repo, 'repo')
      assert.equal(obj.branch, 'master')
    })

    it("rejects github", function(){
      var obj = bb("github:user/repo")
      assert.equal(obj, null)
    })

  })

  describe("oldschool", function(){

    it("supports git@ URLs", function() {
      var obj = bb("git@bitbucket.org:heroku/heroku-flags.git")
      assert.equal(obj.user, 'heroku')
      assert.equal(obj.repo, 'heroku-flags')
    })

    it("defaults to master branch", function() {
      var obj = bb("git@bitbucket.org:heroku/heroku-flags.git")
      assert.equal(obj.branch, 'master')
    })

    it("supports git:// URLs", function() {
      var obj = bb("git://bitbucket.org/foo/bar.git")
      assert.equal(obj.user, 'foo')
      assert.equal(obj.repo, 'bar')
    })

    it("defaults to master branch", function() {
      var obj = bb("git://bitbucket.org/foo/bar.git")
      assert.equal(obj.branch, 'master')
    })

  })

  describe("http", function(){

    it("supports http URLs", function() {
      var obj = bb("http://bitbucket.org/sikelianos/ord.git")
      assert.equal(obj.user, 'sikelianos')
      assert.equal(obj.repo, 'ord')
    })

    it("supports https URLs", function() {
      var obj = bb("https://bitbucket.org/sikelianos/ord.git")
      assert.equal(obj.user, 'sikelianos')
      assert.equal(obj.repo, 'ord')
    })

    it("supports deep URLs", function() {
      var obj = bb("https://bitbucket.org/sikelianos/ord/commits/ff7b3d38b3459845cd592b6c60e1a3c82af78489?at=master")
      assert.equal(obj.user, 'sikelianos')
      assert.equal(obj.repo, 'ord')
    })

    it("doesn't require .git extension", function() {
      var obj = bb("https://bitbucket.org/sikelianos/ord")
      assert.equal(obj.user, 'sikelianos')
      assert.equal(obj.repo, 'ord')
    })

    it("defaults to master branch", function() {
      var obj = bb("https://bitbucket.org/sikelianos/ord")
      assert.equal(obj.branch, 'master')
    })

  })

  describe("properties", function() {
    var obj

    before(function(){
      obj = bb("sikelianos/ord")
    })

    it("user", function() {
      assert.equal(obj.user, "sikelianos")
    })

    it("repo", function() {
      assert.equal(obj.repo, "ord")
    })

    it("branch", function() {
      assert.equal(obj.branch, "master")
    })

    it("tarball_url", function() {
      assert.equal(obj.tarball_url, "https://bitbucket.org/sikelianos/ord/get/master.tar.gz")
    })

    it("api_url", function() {
      assert.equal(obj.api_url, "https://api.bitbucket.org/2.0/repositories/sikelianos/ord")
    })

    it("https_url", function() {
      assert.equal(obj.https_url, "https://bitbucket.org/sikelianos/ord")
    })

    it("travis_url", function() {
      assert.equal(obj.travis_url, "https://travis-ci.org/sikelianos/ord")
    })

  })

  describe("branch other than master", function() {

    var obj

    before(function(){
      obj = bb("sikelianos/ord#new-style")
    })

    it("applies to tarball_url", function() {
      assert.equal(obj.tarball_url, "https://bitbucket.org/sikelianos/ord/get/new-style.tar.gz")
    })

    it("applies to https_url", function() {
      assert.equal(obj.https_url, "https://bitbucket.org/sikelianos/ord/branch/new-style")
    })

    it("applies to travis_url", function() {
      assert.equal(obj.travis_url, "https://travis-ci.org/sikelianos/ord?branch=new-style")
    })

  })

  describe("failure", function(){

    it("returns null if url is falsy", function() {
      assert.equal(bb(), null)
      assert.equal(bb(null), null)
      assert.equal(bb(undefined), null)
      assert.equal(bb(""), null)
    })

    it("returns null for non-bitbucket URLs", function() {
      var obj = bb("https://bitbucket.com/other/thing")
      assert.equal(obj, null)
    })

  })

})

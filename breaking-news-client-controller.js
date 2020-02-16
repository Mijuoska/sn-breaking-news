function($scope, spUtil) {
  /* widget controller */
  var c = this;
	
	c.getNewsSource = function() {
		c.server.update();
	}

}
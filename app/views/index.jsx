var React = require('react');
var DefaultLayout = require('./layouts/default');
// var RaisedButton = require('material-ui/lib/raised-button');
// var AppBar = require('material-ui/lib/app-bar')

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        // <AppBar title={this.props.name} iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <div>Hello {this.props.name}</div>
        // <RaisedButton title={this.props.name} />
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;
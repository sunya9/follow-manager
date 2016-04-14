import React, { Component, PropTypes } from 'react';
import { createLink } from '../../utils';

class User extends Component {
  render() {
    this.props.data.description = this.props.data.description.replace(/@[A-Za-z_0-9]+/g, id => createLink(`https://twitter.com/${id.substring(1)}`, id));
    this.props.data.entities.description.urls.forEach(url => this.props.data.description = this.props.data.description.replace(new RegExp(url.url, 'g'), createLink(url.expanded_url, url.expanded_url)));
    return (
      <div className="media">
        <div className="media-left">
          <img src={this.props.data.profile_image_url_https} />
        </div>
        <div className="media-body">
          <div className="media-heading">
            {this.props.data.name} <small><a href={`https://twitter.com/${this.props.data.screen_name}`} target="_new">@{this.props.data.screen_name}</a></small>
          </div>
          <p dangerouslySetInnerHTML={{__html: this.props.data.description}}>
          </p>
          {this.props.data.id}
        </div>
      </div>
    );
  }
}

User.propTypes = {
  data: PropTypes.object
};

User.defaultProps = {
  data: {}
};

export default User;

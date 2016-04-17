import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleSelect } from '../../actions/users';
import { createLink } from '../../utils';

class User extends Component {
  render() {
    if(this.props.profile_image_url_https) {
      var profile_image_url_https = this.props.profile_image_url_https.replace('normal', 'bigger');
    }
    if(this.props.description) {
      var description = this.props.description.replace(/@[A-Za-z_0-9]+/g, id => createLink(`https://twitter.com/${id.substring(1)}`, id));
      this.props.entities.description.urls.forEach(url => description = description.replace(new RegExp(url.url, 'g'), createLink(url.expanded_url, url.expanded_url)));
    }
    console.log(this.props);
    return (
      <div className={'responsive-card ' + (this.props.select ? 'responsive-card--selected' : '')}>
        <input type="checkbox" checked={this.props.select} className="user__select" onChange={this.props.toggleSelect} />
        <div alt="" className="card-img-top" style={{
          backgroundImage: `url(${this.props.profile_banner_url})`
        }} onClick={this.props.toggleSelect}></div>
        <div className="card-block">
          <div className="media">
            <div className="media-left">
              <img src={profile_image_url_https} width="73" height="73" className="media-left__icon" />
            </div>
            <div className="media-body">
              <div className="card-title">
                <div className="card-title__name">
                  {this.props.name}
                </div>
                <div className="card-title__screen-name">
                  <small>
                    <a href={`https://twitter.com/${this.props.screen_name}`} target="_new">@{this.props.screen_name}</a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <a href={this.props.entities.url.urls[0].expanded_url} target="_new">
              <i className="fa fa-link fa-fw"></i> {this.props.entities.url.urls[0].expanded_url}</a>
            </li>
          <li className="list-group-item">
            <i className="fa fa-map-marker fa-fw"></i>
            {this.props.location}
          </li>
        </ul>
        <div className="card-block">
          <p className="card-text" dangerouslySetInnerHTML={{__html: description}}>
          </p>
          {this.props.id}
        </div>
      </div>
    );
  }
}

User.propTypes = {
  userId: PropTypes.number.isRequired
};

User.defaultProps = {
  userId: 0
};

function mapStateToProps(state, ownProps) {
  return state.users.users.allUserInfo[ownProps.userId];
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleSelect() {
      dispatch(toggleSelect(ownProps.userId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

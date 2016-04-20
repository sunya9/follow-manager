import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { toggleSelect } from '../actions/users';
import { createLink } from '../../utils';

class User extends Component {
  render() {
    const profile_image_url_https = this.props.user.profile_image_url_https.replace('normal', 'bigger');
    const small_profile_image_url_https = this.props.user.profile_image_url_https.replace('normal', 'mini');
    var description = this.props.user.description;
    if(description) {
      description = description.replace(/@[A-Za-z_0-9]+/g, id => createLink(`https://twitter.com/${id.substring(1)}`, id));
      this.props.user.entities.description.urls.forEach(url => description = description.replace(new RegExp(url.url, 'g'), createLink(url.expanded_url, url.expanded_url)));
    }

    return this.props.settings.showMode === 'card' ? (
      <li className={'responsive-card ' + (this.props.user.select ? 'responsive-card--selected' : '')}>
        <input type="checkbox" checked={this.props.user.select} className="user__select" onChange={this.props.toggleSelect} />
        <div alt="" className="card-img-top" style={{
          backgroundImage: this.props.user.profile_banner_url ? `url(${this.props.user.profile_banner_url + '/600x200'})` : 'none',
          backgroundColor: !this.props.user.profile_banner_url ? `#${this.props.user.profile_link_color}` : 'transparent'
        }} onClick={this.props.toggleSelect}></div>
        <div className="card-block">
          <div className="media">
            <div className="media-left">
              <img src={profile_image_url_https} width="73" height="73" className="media-left__icon" />
            </div>
            <div className="media-body">
              <div className="card-title">
                <div className="card-title__name">
                  {this.props.user.name}
                </div>
                <div className="card-title__screen-name">
                  <small>
                    <a href={`https://twitter.com/${this.props.user.screen_name}`} target="_new">@{this.props.user.screen_name}</a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
        {
          this.props.user.entities.url ? (
            <li className="list-group-item">
              <a href={this.props.user.entities.url.urls[0].expanded_url} target="_new">
              <i className="fa fa-link fa-fw"></i> {this.props.user.entities.url.urls[0].expanded_url}</a>
            </li>
          ) : null
        }
        {
          this.props.user.location ? (
            <li className="list-group-item">
              <i className="fa fa-map-marker fa-fw"></i>
              {this.props.user.location}
            </li>
          ) : null
        }
        </ul>
        <div className="card-block">
          <p className="card-text" dangerouslySetInnerHTML={{__html: description}}>
          </p>
          {this.props.user.id}
        </div>
      </li>
    ) : (
      <tr onClick={e => {
        if(['A', 'INPUT'].includes(e.target.tagName)) {
          e.stopPropagation();
        } else {
          this.props.toggleSelect();
        }
      }}>
        <td>
          <input type="checkbox" checked={this.props.user.select} onChange={this.props.toggleSelect} />
        </td>
        <th scope="row" className="user-list-table__index">{this.props.index}</th>
        <td><img src={small_profile_image_url_https} width="24" height="24" /> {this.props.user.name}</td>
        <td><a href={`https://twitter.com/${this.props.user.screen_name}`} target="_new">{this.props.user.screen_name}</a></td>
        <td>{this.props.user.friends_count}</td>
        <td>{this.props.user.followers_count}</td>
        <td>{moment(new Date(this.props.user.status.created_at)).format('YYYY/MM/DD HH:mm:ss')}</td>
      </tr>
    );
  }
}

User.propTypes = {
  userId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

User.defaultProps = {
  userId: 0,
  index: 0,
  user: {},
  settings: {}
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.users.users.allUserInfo[ownProps.userId],
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleSelect() {
      dispatch(toggleSelect(ownProps.userId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

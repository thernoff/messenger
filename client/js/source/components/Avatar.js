import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

class Avatar extends Component{
    constructor(props) {
        //console.log('===================CONSTRUCTOR===================');
        for (var key in props) {
            //console.log('props['+key+']=', props[key])
        }
        //console.log('===================/CONSTRUCTOR===================');
        super(props);
        this.state = {
            id: props.id,
            src: props.src,
            title: props.title,
            alt: props.alt,
            size: props.size,
            form: props.form,
            active: props.active,
            online: props.online,
        };
    }

    render(){
        let online = this.props.online;
        return (
            <div className={classNames('Avatar', {'active' : this.props.active, 'online' : online, 'offline': !online})} >
                    <img className={classNames(
                            this.props.size, this.props.form,
                        )} 
                        src={this.props.src}
                        alt={this.props.alt}
                        title={this.props.title}
                        data-id={this.props.id ? this.props.id : ''}
                        onClick={this.props.onClick}
                    />
                    {
                        (this.props.numNewMessages && this.props.numNewMessages > 0)?<span className="num-new-messages">+{this.props.numNewMessages}</span>:<span></span>
                    }
                    
            </div>
        );
    }
}

Avatar.propTypes = {
    size: PropTypes.string,
    src: PropTypes.string,
    form: PropTypes.string,
    online: PropTypes.bool,
    active: PropTypes.bool,
}

Avatar.defaultProps = {
    title: '',
    alt: '',
    src: '',
    form: 'round',
    active: false,
    online: true,
};

export default Avatar
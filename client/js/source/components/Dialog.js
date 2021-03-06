import Button from './Button';
import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';

class Dialog extends Component {

componentWillUnmount() {
    document.body.classList.remove('DialogModalOpen');
}

componentDidMount() {
    if (this.props.modal) {
        document.body.classList.add('DialogModalOpen');
    }
}

  render() {
    return (
      <div className={this.props.modal ? 'Dialog DialogModal' : 'Dialog'}>
        <div className={this.props.modal ? 'DialogModalWrap' : null}>
          <div className="DialogHeader">{this.props.header}</div>
          <div className="DialogBody">
            {this.props.children}
            
            {
              this.props.info
              ? <div className={classNames('info', {'success' : this.props.info.status === 'success', 'error' : this.props.info.status === 'error'})}>{this.props.info.text}</div>
              : null
            }
          </div>
          <div className="DialogFooter">
            {this.props.hasCancel
              ? <span 
                  className="DialogDismiss"
                  onClick={this.props.onAction.bind(this, 'dismiss')}>
                  Cancel
                </span>
              : null
            }
            <Button onClick={this.props.onAction.bind(this, 
                this.props.hasCancel ? 'confirm' : 'dismiss')}>
              {this.props.confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
    header: PropTypes.string.isRequired,
    confirmLabel: PropTypes.string,
    modal: PropTypes.bool,
    onAction: PropTypes.func,
    hasCancel: PropTypes.bool,
};

Dialog.defaultProps = {
    confirmLabel: 'Ok',
    modal: false,
    onAction: () => {},
    hasCancel: true,
};

export default Dialog
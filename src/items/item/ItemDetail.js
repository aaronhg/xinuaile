import React from 'react'
import PropTypes from 'prop-types'
import { getShortID, getTimestamp } from '../../utils/id'
import { CirclePicker } from 'react-color'
import ReactTags from 'react-tag-autocomplete'

let itemDefaultValue = {

}
let weights = [{
    txt: "*1",
    val: 1,
}, {
    txt: "*2",
    val: 2,
}, {
    txt: "*3",
    val: 3,
}, {
    txt: "*5",
    val: 5,
}, {
    txt: "*10",
    val: 10,
}]
class ItemDetail extends React.Component {
    constructor(props) {
        super()
        this.handleSave = this.handleSave.bind(this)
        this.setColor = this.setColor.bind(this)
        this.setWeight = this.setWeight.bind(this)
        this.inputRefs = {}
        // let { item: { ref_tags } } = this.props
        let ref_tags = props.item && props.item.ref_tags
        let bgcolor = props.item && props.item.bgcolor
        let weight = props.item && props.item.weight || 1
        let wxx = weights.find(w => w.val == weight)
        this.state = {
            tags: ref_tags || [],
            color: bgcolor || "",
            weight: weight,
            useWeightInput: !wxx,
        }
    }
    handleSave() {
        let { item, existNames } = this.props
        const { name, bgcolor, gtype, order, weight } = this.inputRefs
        this.props.saveItem({
            name: name.value,
            bgcolor: bgcolor && bgcolor.hex || "",
            gtype: gtype.value,
            id: item.id || getShortID(),
            ref_tags: this.state.tags,
            weight: this.state.useWeightInput ? weight.value : this.state.weight,
            order: order.value,
        })
        this.props.goBack()
    }
    setColor(color) {
        this.inputRefs.bgcolor = color
        this.setState({ color })
    }
    setWeight(weight) {
        this.setState({ weight,useWeightInput:false })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    handleDelete(i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
    }
    handleAddition(tag) {
        if (!tag.id)
            tag.id = getShortID()
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })
    }
    render() {
        let { item } = this.props
        let values = item || itemDefaultValue
        return (<form style={{position:"relative"}}>
            <div className="row">
                <div className="small-3 columns">
                    <label className="text-right middle">name:</label>
                </div>
                <div className="small-3 columns">
                    <input ref={(ref) => this.inputRefs.name = ref} placeholder="item name" defaultValue={values.name} />
                </div>
            </div>
            <div className="row">
                <div className="small-3 columns">
                    <label className="text-right middle">bgcolor:</label>
                </div>
                <div className="small-3 columns">
                    <CirclePicker onChange={this.setColor} color={this.state.color}></CirclePicker>
                </div>
            </div>
            <div className="row">
                <div className="small-3 columns">
                    <label className="text-right middle">gtype:</label>
                </div>
                <div className="small-3 columns">
                    <select ref={(ref) => this.inputRefs.gtype = ref} defaultValue={values.gtype} >
                        <option value="+-2">
                            +-2
                                    </option>
                        <option value="+5">
                            +5
                                    </option>
                        <option value="keyin">
                            keyin
                                    </option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="small-3 columns">
                    <label className="text-right middle">tags:</label>
                </div>
                <div className="small-6 columns">
                    <ReactTags
                        tags={this.state.tags}
                        suggestions={this.props.tags}
                        minQueryLength={1}
                        autofocus={false}
                        handleDelete={this.handleDelete.bind(this)}
                        handleAddition={this.handleAddition.bind(this)}
                        allowNew={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="small-3 columns">
                    <label className="text-right middle">weight:</label>
                </div>
                <div className="small-6 columns">
                    {weights.map(w => {
                        let styles = w.val == this.state.weight ? { cursor: "pointer", color: "red", } : { cursor: "pointer", }
                        return (<a style={styles} key={w.val} onClick={() => this.setWeight(w.val)}>{w.txt}</a>)
                    })}
                    <input type="checkbox" checked={this.state.useWeightInput} onChange={(e)=>this.setState({useWeightInput:e.target.checked,weight:0})}></input>
                    custom: <input type="number" ref={(ref) => this.inputRefs.weight = ref} placeholder="weight" defaultValue={values.weight} />
                </div>
            </div>
            <div className="row">
                <div className="small-3 columns">
                    <label className="text-right middle">order:</label>
                </div>
                <div className="small-2 columns">
                    <input type="number" ref={(ref) => this.inputRefs.order = ref} placeholder="order" defaultValue={values.order} />
                </div>
            </div>
            <a style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                cursor: "pointer",
            }} onClick={this.handleSave}> Save </a>
        </form>
        )

        // todo : 
        // 用 chip 取代 reacttags
        // <input type="checkbox" readOnly="readOnly" value={this.state.weightByCustom} />custom:<input onChange={(v)=>this.setWeight(v)} defaultValue={values.weight} />
        // <FontIcon type="minus-circle-o" />
        // <FontIcon type="minus"  />
        // <FontIcon type="plus" />
        // <FontIcon type="plus-circle-o"  />
        // <span>{String.fromCharCode(9312)}</span>
        // <span>{String.fromCharCode(9313)}</span>
        // <span>{String.fromCharCode(9314)}</span>
        // <span>{String.fromCharCode(9315)}</span>
    }
}
ItemDetail.propTypes = {
    // addItem: PropTypes.func.isRequired,
}
export default ItemDetail
import {Record, List}from "immutable";
import InputModel from "./input";
import {CellPoint} from "../common";
import {OBJECT_TYPE} from "../gridview/object-type";
import {CellRange} from "../common/cellrange";

function objectCursor(objectType){
  switch (objectType){
    case OBJECT_TYPE.CELL:
      return "pointer";
    case OBJECT_TYPE.COLUMN_RESIZER:
      return "col-resize";
    case OBJECT_TYPE.ROW_RESIZER:
      return "row-resize";
    case OBJECT_TYPE.COLUMN_HEADER:
      return "pointer";
    case OBJECT_TYPE.ROW_HEADER:
      return "pointer";
    default:
      return "default";
  }
}

export default class Operation extends Record({
  input: new InputModel(),
  selectItem: null,
  opeItem: null,
  hoverItem: null,
  rangeItem: null,
  rangeItems: List(),
  canvasRect: null,
  scroll: new CellPoint(1, 1)
}) {

  /**
   * 入力状態設定
   * @param {InputModel} input 入力状態
   * @return {Operation}        更新した自身
   */
  setInput(input){
    return this.set("input", input);
  }

  setSelectItem(selectItem){
    return this.set("selectItem", selectItem);
  }

  setScroll(scroll){
    return this.set("scroll", scroll);
  }

  withScroll(mutator){
    return this.set("scroll", mutator(this.scroll));
  }

  setHoverItem(hoverItem){
    return this.set("hoverItem", hoverItem);
  }

  setOpeItem(opeItem){
    return this.set("opeItem", opeItem);
  }

  setRangeItem(rangeItem){
    return this.set("rangeItem", rangeItem);
  }

  /**
   * 選択範囲追加
   * @param  {CellRange} rangeItem 選択範囲
   * @return {Operation} 更新した自身
   */
  pushRangeItems(rangeItem){
    return this.set("rangeItems", this.rangeItems.push(rangeItem));
  }

  /**
   * 選択範囲のクリア
   * @return {Operation} 更新した自身
   */
  clearRangeItems(){
    return this.set("rangeItems", this.rangeItems.clear());
  }

  setCanvasRect(canvasRect){
    return this.set("canvasRect", canvasRect);
  }

  resetRange(){
    const target = this.selectItem.cellPoint;
    const range = new CellRange(target, target);
    return this.setRangeItem(range);
  }

  opeCursor(){
    if (!this.opeItem){
      return null;
    }

    // マウスの下にあるオブジェクトのタイプ
    const objectType = this.opeItem.objectType;
    return objectCursor(objectType);
  }

  get HoverCursor(){

    // 操作中のオブジェクトに対するマウスカーソルを変更する
    const opeCursor = this.opeCursor();
    if (opeCursor){
      return opeCursor;
    }

    if (!this.hoverItem){
      return "default";
    }


    // マウスの下にあるオブジェクトのタイプ
    const objectType = this.hoverItem.objectType;

    return objectCursor(objectType);
  }
}

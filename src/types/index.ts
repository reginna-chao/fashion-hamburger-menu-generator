export interface Point {
  x: number;
  y: number;
}

// PathPoint 用於 Bezier 曲線，區分錨點與控制點
export interface PathPoint extends Point {
  type: 'anchor' | 'control';
}

export interface LineState {
  menu: PathPoint[];
  close: PathPoint[];
}

export type Lines = [LineState, LineState, LineState];

export type Mode = 'menu' | 'close';

export type Method = 'checkbox' | 'class';

export interface PathData {
  d: string;
  totalLength: number;
  menuLength: number;
  closeLength: number;
  offsetMenu: number;
  offsetClose: number;
}

export interface GeneratedCode {
  html: string;
  css: string;
  js: string;
  fullCode: string;
}

export interface ClassNameConfig {
  baseClass: string;
  activeClass: string;
}

export interface DraggedPoint {
  lineIndex: number;
  pointIndex: number;
  originX: number;
  originY: number;
}

// 工具類型
export type Tool = 'select' | 'pen-add' | 'pen-remove';

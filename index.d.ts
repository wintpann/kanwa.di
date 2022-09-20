interface DIRecordAlterable<R, D, K = void> {
  (dependencies: D): R;

  instance?: R;
  alterKey: K;
}

type EmptyToVoid<T> = T extends Record<string, never> ? void : T;

interface DIRecord<R, D> {
  (dependencies: D): R;

  instance?: R;
  alterBy<K extends string>(key: K): DIRecordAlterable<R, D, K>;
}

type DIComposite<R, D, K> = DIRecordAlterable<R, D, K> | DIRecord<R, D> | DIKey<D, K>;
type DIAnyComposite = DIComposite<any, any, any>;

type DICompositeValue<D extends DIAnyComposite> = D extends DIKey<infer ID, infer IK> ? ID : D extends DIRecordAlterable<infer IR, infer ID, infer IK> ? IR : D extends DIRecord<infer IR, infer ID> ? IR : never;

type DICompositeDependency<D extends DIAnyComposite> = D extends DIKey<infer ID, infer IK> ? { [key in IK]: ID } : D extends DIRecord<infer ID, infer IK> ? (IK extends void ? {} : IK) : D extends DIRecordAlterable<infer IR, infer ID, infer IK> ? (ID extends void ? {} : ID) & { [key in IK]?: IR } : never;

interface DIRecordCreator {
  <R>(project: () => R): DIRecord<R, void>;

  <R, OA extends DIAnyComposite>(a: OA, project: (pa: DICompositeValue<OA>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite>(a: OA, b: OB, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite>(a: OA, b: OB, c: OC, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite, OE extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, e: OE, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>, pe: DICompositeValue<OE>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD> & DICompositeDependency<OE>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite, OE extends DIAnyComposite, OF extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, e: OE, f: OF, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>, pe: DICompositeValue<OE>, pf: DICompositeValue<OF>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD> & DICompositeDependency<OE> & DICompositeDependency<OF>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite, OE extends DIAnyComposite, OF extends DIAnyComposite, OG extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, e: OE, f: OF, g: OG, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>, pe: DICompositeValue<OE>, pf: DICompositeValue<OF>, pg: DICompositeValue<OG>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD> & DICompositeDependency<OE> & DICompositeDependency<OF> & DICompositeDependency<OG>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite, OE extends DIAnyComposite, OF extends DIAnyComposite, OG extends DIAnyComposite, OH extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, e: OE, f: OF, g: OG, h: OH, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>, pe: DICompositeValue<OE>, pf: DICompositeValue<OF>, pg: DICompositeValue<OG>, ph: DICompositeValue<OH>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD> & DICompositeDependency<OE> & DICompositeDependency<OF> & DICompositeDependency<OG> & DICompositeDependency<OH>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite, OE extends DIAnyComposite, OF extends DIAnyComposite, OG extends DIAnyComposite, OH extends DIAnyComposite, OI extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, e: OE, f: OF, g: OG, h: OH, i: OI, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>, pe: DICompositeValue<OE>, pf: DICompositeValue<OF>, pg: DICompositeValue<OG>, ph: DICompositeValue<OH>, pi: DICompositeValue<OI>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD> & DICompositeDependency<OE> & DICompositeDependency<OF> & DICompositeDependency<OG> & DICompositeDependency<OH> & DICompositeDependency<OI>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite, OE extends DIAnyComposite, OF extends DIAnyComposite, OG extends DIAnyComposite, OH extends DIAnyComposite, OI extends DIAnyComposite, OJ extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, e: OE, f: OF, g: OG, h: OH, i: OI, j: OJ, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>, pe: DICompositeValue<OE>, pf: DICompositeValue<OF>, pg: DICompositeValue<OG>, ph: DICompositeValue<OH>, pi: DICompositeValue<OI>, pj: DICompositeValue<OJ>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD> & DICompositeDependency<OE> & DICompositeDependency<OF> & DICompositeDependency<OG> & DICompositeDependency<OH> & DICompositeDependency<OI> & DICompositeDependency<OJ>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite, OE extends DIAnyComposite, OF extends DIAnyComposite, OG extends DIAnyComposite, OH extends DIAnyComposite, OI extends DIAnyComposite, OJ extends DIAnyComposite, OK extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, e: OE, f: OF, g: OG, h: OH, i: OI, j: OJ, k: OK, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>, pe: DICompositeValue<OE>, pf: DICompositeValue<OF>, pg: DICompositeValue<OG>, ph: DICompositeValue<OH>, pi: DICompositeValue<OI>, pj: DICompositeValue<OJ>, pk: DICompositeValue<OK>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD> & DICompositeDependency<OE> & DICompositeDependency<OF> & DICompositeDependency<OG> & DICompositeDependency<OH> & DICompositeDependency<OI> & DICompositeDependency<OJ> & DICompositeDependency<OK>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite, OE extends DIAnyComposite, OF extends DIAnyComposite, OG extends DIAnyComposite, OH extends DIAnyComposite, OI extends DIAnyComposite, OJ extends DIAnyComposite, OK extends DIAnyComposite, OL extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, e: OE, f: OF, g: OG, h: OH, i: OI, j: OJ, k: OK, l: OL, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>, pe: DICompositeValue<OE>, pf: DICompositeValue<OF>, pg: DICompositeValue<OG>, ph: DICompositeValue<OH>, pi: DICompositeValue<OI>, pj: DICompositeValue<OJ>, pk: DICompositeValue<OK>, pl: DICompositeValue<OL>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD> & DICompositeDependency<OE> & DICompositeDependency<OF> & DICompositeDependency<OG> & DICompositeDependency<OH> & DICompositeDependency<OI> & DICompositeDependency<OJ> & DICompositeDependency<OK> & DICompositeDependency<OL>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite, OE extends DIAnyComposite, OF extends DIAnyComposite, OG extends DIAnyComposite, OH extends DIAnyComposite, OI extends DIAnyComposite, OJ extends DIAnyComposite, OK extends DIAnyComposite, OL extends DIAnyComposite, OM extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, e: OE, f: OF, g: OG, h: OH, i: OI, j: OJ, k: OK, l: OL, m: OM, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>, pe: DICompositeValue<OE>, pf: DICompositeValue<OF>, pg: DICompositeValue<OG>, ph: DICompositeValue<OH>, pi: DICompositeValue<OI>, pj: DICompositeValue<OJ>, pk: DICompositeValue<OK>, pl: DICompositeValue<OL>, pm: DICompositeValue<OM>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD> & DICompositeDependency<OE> & DICompositeDependency<OF> & DICompositeDependency<OG> & DICompositeDependency<OH> & DICompositeDependency<OI> & DICompositeDependency<OJ> & DICompositeDependency<OK> & DICompositeDependency<OL> & DICompositeDependency<OM>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite, OE extends DIAnyComposite, OF extends DIAnyComposite, OG extends DIAnyComposite, OH extends DIAnyComposite, OI extends DIAnyComposite, OJ extends DIAnyComposite, OK extends DIAnyComposite, OL extends DIAnyComposite, OM extends DIAnyComposite, ON extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, e: OE, f: OF, g: OG, h: OH, i: OI, j: OJ, k: OK, l: OL, m: OM, n: ON, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>, pe: DICompositeValue<OE>, pf: DICompositeValue<OF>, pg: DICompositeValue<OG>, ph: DICompositeValue<OH>, pi: DICompositeValue<OI>, pj: DICompositeValue<OJ>, pk: DICompositeValue<OK>, pl: DICompositeValue<OL>, pm: DICompositeValue<OM>, pn: DICompositeValue<ON>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD> & DICompositeDependency<OE> & DICompositeDependency<OF> & DICompositeDependency<OG> & DICompositeDependency<OH> & DICompositeDependency<OI> & DICompositeDependency<OJ> & DICompositeDependency<OK> & DICompositeDependency<OL> & DICompositeDependency<OM> & DICompositeDependency<ON>>>;

  <R, OA extends DIAnyComposite, OB extends DIAnyComposite, OC extends DIAnyComposite, OD extends DIAnyComposite, OE extends DIAnyComposite, OF extends DIAnyComposite, OG extends DIAnyComposite, OH extends DIAnyComposite, OI extends DIAnyComposite, OJ extends DIAnyComposite, OK extends DIAnyComposite, OL extends DIAnyComposite, OM extends DIAnyComposite, ON extends DIAnyComposite, OO extends DIAnyComposite>(a: OA, b: OB, c: OC, d: OD, e: OE, f: OF, g: OG, h: OH, i: OI, j: OJ, k: OK, l: OL, m: OM, n: ON, o: OO, project: (pa: DICompositeValue<OA>, pb: DICompositeValue<OB>, pc: DICompositeValue<OC>, pd: DICompositeValue<OD>, pe: DICompositeValue<OE>, pf: DICompositeValue<OF>, pg: DICompositeValue<OG>, ph: DICompositeValue<OH>, pi: DICompositeValue<OI>, pj: DICompositeValue<OJ>, pk: DICompositeValue<OK>, pl: DICompositeValue<OL>, pm: DICompositeValue<OM>, pn: DICompositeValue<ON>, po: DICompositeValue<OO>) => R): DIRecord<R, EmptyToVoid<DICompositeDependency<OA> & DICompositeDependency<OB> & DICompositeDependency<OC> & DICompositeDependency<OD> & DICompositeDependency<OE> & DICompositeDependency<OF> & DICompositeDependency<OG> & DICompositeDependency<OH> & DICompositeDependency<OI> & DICompositeDependency<OJ> & DICompositeDependency<OK> & DICompositeDependency<OL> & DICompositeDependency<OM> & DICompositeDependency<ON> & DICompositeDependency<OO>>>;
}

type DIKey<D, K> = {
  require: D;
  key: K;
};

interface DIKeyCreator {
  <D>(): D extends infer ID ? <K extends string>(key: K) => K extends infer IK ? DIKey<ID, IK> : never : never;
}

interface DI {
  record: DIRecordCreator;
  key: DIKeyCreator;
}

export const di: DI;

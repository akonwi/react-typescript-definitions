// Type definitions for React v0.13.1
// Project: http://facebook.github.io/react/
// Definitions by: @akonwi https://github.com/akonwi/
// Definitions by: @wizzard0 https://github.com/wizzard0/
// Definitions by: @fdecampredon https://github.com/fdecampredon/
// Definitions: https://github.com/akonwi/react-typescript-definitions/
// License: MIT

declare module 'react' {
    export = React;
}

declare module React {
    /**
     * Configure React's event system to handle touch events on mobile devices.
     * @param shouldUseTouch true if React should active touch events, false if it should not
     */
    function initializeTouchEvents(shouldUseTouch: boolean): void;

    /**
     * Create a ReactClass given a specification. A component implements a render method which returns one single child.
     * That child may have an arbitrarily deep child structure.
     * One thing that makes components different than standard prototypal classes is that you don't need to call new on them.
     * They are convenience wrappers that construct backing instances (via new) for you.
     *
     * @param spec the component specification
     */
    function createClass(specification: ComponentSpec): ReactClass;

    /**
     * Create and return a new ReactElement of the given type.
     * 
     * @param type      Can be either an html tag name string or a ReactClass
     * @param props     The object representing the intial props
     * @param children  an array of Elements to be the children
     */
    function createElement(type: string, props?: Object, children?: any[]): ReactElement;
    function createElement(type: ReactClass, props?: Object, children?: any[]): ReactElement;

    /**
     * Clone and return a new ReactElement using the given element as the starting point.
     * The resulting element will have the orginal element's props with the new props
     * merged in shallowly. New children will replace existing children.
     * Unlike React.addons.cloneWithProps, key and ref from the original element will be preserved.
     * There is no special behavior for merging any props (unlike cloneWithProps).
     * 
     * @param type      The ReactElement to clone
     * @param props     The object representing the intial props
     * @param children  an array of Elements to be the children
     */
    function cloneElement(type: ReactElement, props?: Object, children?: any[]): ReactElement;

    /**
     * Return a function that produces Elements of a given type.
     * @param type      Can be either an html tag name string or a ReactClass
     */
    function createFactory(type: string): FactoryFunction;
    function createFactory(type: ReactClass): FactoryFunction;

    /**
     * Render a ReactComponent into the DOM in the supplied container.
     * If the ReactElement was previously rendered into the given container,
     * this will perform an update on it and only mutate the DOM as necessary to reflect the latest ReactComponent.
     *
     * @param element   the element to render
     * @param container the node that should contain the result of rendering
     * @param callback  an optional callback that will be executed after the component is rendered or updated.
     */
    function render(element: ReactElement, container: HTMLElement, callback?: Function): ReactComponent;

    /**
     * Remove a mounted React component from the DOM and clean up its event handlers and state.
     * If no component was mounted in the container, calling this function does nothing.
     * Returns true if a component was unmounted and false if there was no component to unmount.
     *
     * @param container the node that should be cleaned from React component
     */
    function unmountComponentAtNode(container: HTMLElement): boolean;

    /**
     * Render a ReactElement to its initial HTML. This should only be used on the server.
     * React will call callback with an HTML string when the markup is ready.
     * You can use this method to can generate HTML on the server and send the markup down on the initial request for faster page loads
     * and to allow search engines to crawl your pages for SEO purposes.
     * If you call React.renderComponent() on a node that already has this server-rendered markup,
     * React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
     *
     * @param component the component to render
     */
    function renderToString(element: ReactElement): string;

    /**
     * Similar to renderToString, except this doesn't create extra DOM attributes such as data-react-id,
     * that React uses internally. This is useful if you want to use React as a simple static page generator,
     * as stripping away the extra attributes can save lots of bytes.
     *
     * @param component the component to render
     */
    function renderToStaticMarkup(element: ReactElement): string;

    /**
     * Verifies the object is an Element
     * 
     * @param object
     */
    function isValidElement(object: any): boolean;

    /**
     * If this component has been mounted into the DOM, this returns the corresponding native browser DOM element.
     * This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements.
     * When render returns null or false, this function returns null.
     *
     * @param component
     */
    function findDOMNode(component: ReactComponent): HTMLElement;

    /**
     * Provides utilities for dealing with the this.props.children opaque data structure.
     */
    module Children {
        /**
         * Invoke fn on every immediate child contained within children with this set to context.
         * If children is a nested object or array, it will be traversed: fn will never be passed the container objects.
         * If chilren is null or undefined, returns null or undefined rather than an empty object.
         *
         * @param children  the collection of child elements
         * @param fn    	the callback to execute on each child
         * @param context   the object that this will be
         */
        function map(children: Object, fn: Function, context?: Object): Object;

        /**
         * Like React.Children.map() but does not return an object.
         *
         * @param children the collection of children elements
         * @param fn the callback to execute on each child
         * @context the object that this will be
         */
        function each(children: Object, fn: Function, context?: Object): void;

        /**
         * Return the only child in children. Throws otherwise.
         *
         * @param children
         */
        function only(children: Object): Object;

        /**
         * Return the total number of components in children, equal to the number of times that a
         * callback passed map or forEach would be invoked.
         * 
         * @param children
         */
        function count(children: Object): number;
    }

    module addons {
        function classSet(classes: Object): string;
    }

    /**
     * Includes types that can be used with a component's propTypes object to validate
     * props being passed to your components.
     */
    var PropTypes: {
        any: PropTypeValidator;
        array: PropTypeValidator;
        arrayOf: PropTypeValidator;
        bool: PropTypeValidator;
        component: PropTypeValidator;
        element: PropTypeValidator;
        func: PropTypeValidator;
        instanceOf: PropTypeValidator;
        node: PropTypeValidator;
        number: PropTypeValidator;
        object: PropTypeValidator;
        objectOf: PropTypeValidator;
        oneOf: PropTypeValidator;
        oneOfType: PropTypeValidator;
        renderable: PropTypeValidator;
        shape: PropTypeValidator;
        string: PropTypeValidator;
    }

	interface PropTypeValidatorOptions {
        [key: string]: PropTypeValidator;
    }

    interface PropTypeValidator extends Function {
        isRequired: boolean;
    }

    /**
     * Your event handlers will be passed instances of SyntheticEvent, a cross-browser wrapper around the browser's native event.
     * It has the same interface as the browser's native event, including stopPropagation() and preventDefault(),
     * except the events work identically across all browsers.
     * If you find that you need the underlying browser event for some reason, simply use the nativeEvent attribute to get it.
     *
     * Note: 
     * As of v0.12, return false from an event handler will no longer stop event propagation.
     * Instead, e.stopPropagation() or e.preventDefault() should be triggered manually, as appropriate.
     */
    interface SyntheticEvent {
        bubbles: boolean;
        cancelable: boolean;
        currentTarget: EventTarget;
        defaultPrevented: boolean;
        eventPhase: number;
        isTrusted: boolean
        nativeEvent: Event;
        target: EventTarget;
        type: string;
        timeStamp: number;

        preventDefault(): void;
        stopPropagation(): void;
    }

    interface ClipboardEvent extends SyntheticEvent {
        clipboardData: DataTransfer;
    }

    interface KeyboardEvent extends SyntheticEvent {
        altKey: boolean;
        charCode: number;
        ctrlKey: boolean;
        getModifierState(key: number);
        key: string;
        keyCode: number;
        locale: string;
        location: number;
        metaKey: boolean;
        repeat: boolean;
        shiftKey: boolean;
        which: number;
    }

    interface FocusEvent extends SyntheticEvent {
        relatedTarget: EventTarget;
    }

    interface FormEvent extends SyntheticEvent {
    }

    interface MouseEvent extends SyntheticEvent {
        altKey: boolean;
        button: number;
        buttons: number;
        clientX: number;
        clientY: number;
        ctrlKey: boolean;
        getModifierState(key: number);
        metaKey: boolean
        pageX: number;
        pageY: number;
        relatedTarget: EventTarget;
        screenX: number;
        screenY: number;
        shiftKey: boolean;
    }


    interface TouchEvent extends SyntheticEvent {
        altKey: boolean;
        changedTouches: any;//DOMTouchList;
        ctrlKey: boolean;
        metaKey: boolean;
        shiftKey: boolean;
        targetTouches: any//DOMTouchList;
        touches: any//DOMTouchList;
    }

    interface UIEvent extends SyntheticEvent {
        detail: number;
        view: any;//DOMAbstractView
    }

    interface WheelEvent {
        deltaMode: number;
        deltaX: number;
        deltaY: number;
        deltaZ: number;
    }

    interface ReactEvents {
        onCopy?: (event: ClipboardEvent) => void;
        onCut?: (event: ClipboardEvent) => void;
        onPaste?: (event: ClipboardEvent) => void;

        onKeyDown?: (event: KeyboardEvent) => void;
        onKeyPress?: (event: KeyboardEvent) => void;
        onKeyUp?: (event: KeyboardEvent) => void;

        onFocus?: (event: FocusEvent) => void;
        onBlur?: (event: FocusEvent) => void;

        onChange?: (event: FormEvent) => void;
        onInput?: (event: FormEvent) => void;
        onSubmit?: (event: FormEvent) => void;

        onClick?: (event: MouseEvent) => void;
        onContextMenu?: (event: MouseEvent) => void;
        onDoubleClick?: (event: MouseEvent) => void;
        onDrag?: (event: MouseEvent) => void;
        onDragEnd?: (event: MouseEvent) => void;
        onDragEnter?: (event: MouseEvent) => void;
        onDragExit?: (event: MouseEvent) => void;
        onDragLeave?: (event: MouseEvent) => void;
        onDragOver?: (event: MouseEvent) => void;
        onDragStart?: (event: MouseEvent) => void;
        onDrop?: (event: MouseEvent) => void;
        onMouseDown?: (event: MouseEvent) => void;
        onMouseEnter?: (event: MouseEvent) => void;
        onMouseLeave?: (event: MouseEvent) => void;
        onMouseMove?: (event: MouseEvent) => void;
        onMouseUp?: (event: MouseEvent) => void;

        onTouchCancel?: (event: TouchEvent) => void;
        onTouchEnd?: (event: TouchEvent) => void;
        onTouchMove?: (event: TouchEvent) => void;
        onTouchStart?: (event: TouchEvent) => void;

        onScroll?: (event: UIEvent) => void;

        onWheel?: (event: WheelEvent) => void;
    }

    interface ReactAttributes {
        key?: string;
        ref?: string;
    }


    interface HTMLGlobalAttributes extends Attributes, ReactAttributes, ReactEvents {
        accessKey?: string;
        className?: string;
        contentEditable?: string;
        contextMenu?: string;
        dir?: string;
        draggable?: boolean;
        hidden?: boolean;
        id?: string;
        lang?: string;
        spellCheck?: boolean;
        role?: string;
        scrollLeft?: number;
        scrollTop?: number;
        style?: { [styleNam: string]: string };
        tabIndex?: number;
        title?: string;

        dangerouslySetInnerHTML?: {
            __html: string;
        };
    }

    interface AAttributes extends HTMLGlobalAttributes {
        href?: string;
        rel?: string;
        target?: string;
    }

    interface AreaAttributes extends HTMLGlobalAttributes {
        alt?: string;
        href?: string;
        rel?: string;
        target?: string;
    }

    interface AudioAttributes extends HTMLGlobalAttributes {
        autoPlay?: boolean;
        controls?: boolean;
        loop?: boolean;
        preload?: string;
        src?: string;
    }

    interface BaseAttributes extends HTMLGlobalAttributes {
        href?: string;
        target?: string;
    }


    interface ButtonAttributes extends HTMLGlobalAttributes {
        autoFocus?: boolean;
        disabled?: boolean;
        form?: string;
        name?: string;
        type?: string;
        value?: string;
    }

    interface CanvasAttributes extends HTMLGlobalAttributes {
        height?: number;
        width?: number;
    }

    interface DelAttributes extends HTMLGlobalAttributes {
        dateTime?: Date;
    }

    interface EmbedAttributes extends HTMLGlobalAttributes {
        height?: number;
        src?: string;
        type?: string;
        width?: number;
    }

    interface FieldsetAttributes extends HTMLGlobalAttributes {
        form?: string;
        name?: string;
    }

    interface FormAttributes extends HTMLGlobalAttributes {
        accept?: string;
        action?: string;
        autoCapitalize?: string;
        autoComplete?: string;
        encType?: string;
        method?: string;
        name?: string;
        target?: string;
    }

    interface IframeAttributes extends HTMLGlobalAttributes {
        allowFullScreen?: boolean;
        allowTransparency?: boolean;
        frameBorder?: number;
        height?: number;
        name?: string;
        src?: string;
        width?: number;
    }

    interface ImgAttributes extends HTMLGlobalAttributes {
        alt?: string;
        height?: number;
        src?: string;
        width?: number;
    }

    interface InputAttributes extends HTMLGlobalAttributes {
        accept?: string;
        alt?: string;
        autoCapitalize?: string;
        autoComplete?: string;
        autoFocus?: boolean;
        checked?: any;
        disabled?: boolean;
        form?: string;
        height?: number;
        list?: string;
        max?: number;
        maxLength?: number;
        min?: number;
        multiple?: boolean;
        name?: string;
        pattern?: string;
        placeholder?: string;
        readOnly?: boolean;
        required?: boolean;
        size?: number;
        src?: string;
        step?: number;
        type?: string;
        value?: string;
        width?: number;
    }

    interface InsAttributes extends HTMLGlobalAttributes {
        dateTime?: Date;
    }

    interface KeygenAttributes extends HTMLGlobalAttributes {
        autoFocus?: boolean;
        form?: string;
        name?: string;
    }

    interface LabelAttributes extends HTMLGlobalAttributes {
        form?: string;
        htmlFor?: string;
    }

    interface LiAttributes extends HTMLGlobalAttributes {
        value?: string;
    }

    interface LinkAttributes extends HTMLGlobalAttributes {
        href?: string;
        rel?: string;
    }

    interface MapAttributes extends HTMLGlobalAttributes {
        name?: string;
    }

    interface MenuAttributes extends HTMLGlobalAttributes {
        type?: string;
    }

    interface MetaAttributes extends HTMLGlobalAttributes {
        charSet?: string;
        content?: string;
        httpEquiv?: string;
        name?: string;
    }

    interface MeterAttributes extends HTMLGlobalAttributes {
        form?: string;
        max?: number;
        min?: number;
        value?: number;
    }

    interface ObjectAttributes extends HTMLGlobalAttributes {
        data?: string;
        form?: string;
        height?: number;
        name?: string;
        type?: string;
        width?: number;
        wmode?: string;
    }

    interface OptionAttributes extends HTMLGlobalAttributes {
        selected?: boolean;
        value?: string;
    }

    interface OutputAttributes extends HTMLGlobalAttributes {
        form?: string;
        htmlFor?: string;
        name?: string;
    }

    interface ParamAttributes extends HTMLGlobalAttributes {
        name?: string;
        value?: string;
    }

    interface ProgressAttributes extends HTMLGlobalAttributes {
        form?: string;
        max?: number;
        value?: number;
    }

    interface ScriptAttributes extends HTMLGlobalAttributes {
        charSet?: string;
        src?: string;
        type?: string;
    }

    interface SelectAttributes extends HTMLGlobalAttributes {
        autoFocus?: boolean;
        disabled?: boolean;
        form?: string;
        multiple?: boolean;
        name?: string;
        required?: boolean;
        size?: number;
    }

    interface SourceAttributes extends HTMLGlobalAttributes {
        src?: string;
        type?: string;
    }

    interface StyleAttributes extends HTMLGlobalAttributes {
        type?: string;
    }

    interface TableAttributes extends HTMLGlobalAttributes {
        cellPadding?: number;
        cellSpacing?: number;
    }

    interface TdAttributes extends HTMLGlobalAttributes {
        colSpan?: number;
        rowSpan?: number;
    }

    interface TextareaAttributes extends HTMLGlobalAttributes {
        autoFocus?: boolean;
        form?: string;
        maxLength?: string;
        name?: string;
        placeholder?: string;
        readOnly?: string;
        required?: boolean;
    }

    interface ThAttributes extends HTMLGlobalAttributes {
        colSpan?: number;
        rowSpan?: number;
    }

    interface TimeAttributes extends HTMLGlobalAttributes {
        dateTime?: Date;
    }

    interface TrackAttributes extends HTMLGlobalAttributes {
        label?: string;
        src?: string;
    }

    interface VideoAttributes extends HTMLGlobalAttributes {
        autoPlay?: boolean;
        controls?: boolean;
        height?: number;
        loop?: boolean;
        poster?: string;
        preload?: string;
        src?: string;
        width?: number;
    }

    interface SVGAttributes extends ReactAttributes, ReactEvents {
        id?: string;
        cx?: number;
        cy?: number;
        d?: number;
        fill?: string;
        fx?: number;
        fy?: number;
        gradientTransform?: any;
        gradientUnits?: string;
        offset?: number;
        points?: any;
        r?: number;
        rx?: number;
        ry?: number;
        spreadMethod?: string;
        stopColor?: string;
        stopOpacity?: number;
        stroke?: string;
        strokeLinecap?: string;
        strokeWidth?: number;
        transform?: string;
        version?: number;
        viewBox?: any;
        x1?: number;
        x2?: number;
        x?: number;
        y1?: number;
        y2?: number;
        y?: number;
    }

    /**
     * Provides convenience wrappers around React.createElement for DOM components.
     * These should only be used when not using JSX.
     */
    var DOM: {
        a: ReactComponentFactory<AAttributes>;
        abbr: ReactComponentFactory<HTMLGlobalAttributes>;
        address: ReactComponentFactory<HTMLGlobalAttributes>;
        area: ReactComponentFactory<AreaAttributes>;
        article: ReactComponentFactory<HTMLGlobalAttributes>;
        aside: ReactComponentFactory<HTMLGlobalAttributes>;
        audio: ReactComponentFactory<AudioAttributes>;
        b: ReactComponentFactory<HTMLGlobalAttributes>;
        base: ReactComponentFactory<BaseAttributes>;
        bdi: ReactComponentFactory<HTMLGlobalAttributes>;
        bdo: ReactComponentFactory<HTMLGlobalAttributes>;
        big: ReactComponentFactory<HTMLGlobalAttributes>;
        blockquote: ReactComponentFactory<HTMLGlobalAttributes>;
        body: ReactComponentFactory<HTMLGlobalAttributes>;
        br: ReactComponentFactory<HTMLGlobalAttributes>;
        button: ReactComponentFactory<ButtonAttributes>;
        canvas: ReactComponentFactory<CanvasAttributes>;
        caption: ReactComponentFactory<HTMLGlobalAttributes>;
        cite: ReactComponentFactory<HTMLGlobalAttributes>;
        code: ReactComponentFactory<HTMLGlobalAttributes>;
        col: ReactComponentFactory<HTMLGlobalAttributes>;
        colgroup: ReactComponentFactory<HTMLGlobalAttributes>;
        data: ReactComponentFactory<HTMLGlobalAttributes>;
        datalist: ReactComponentFactory<HTMLGlobalAttributes>;
        dd: ReactComponentFactory<HTMLGlobalAttributes>;
        del: ReactComponentFactory<DelAttributes>;
        details: ReactComponentFactory<HTMLGlobalAttributes>;
        dfn: ReactComponentFactory<HTMLGlobalAttributes>;
        div: ReactComponentFactory<HTMLGlobalAttributes>;
        dl: ReactComponentFactory<HTMLGlobalAttributes>;
        dt: ReactComponentFactory<HTMLGlobalAttributes>;
        em: ReactComponentFactory<HTMLGlobalAttributes>;
        embed: ReactComponentFactory<EmbedAttributes>;
        fieldset: ReactComponentFactory<FieldsetAttributes>;
        figcaption: ReactComponentFactory<HTMLGlobalAttributes>;
        figure: ReactComponentFactory<HTMLGlobalAttributes>;
        footer: ReactComponentFactory<HTMLGlobalAttributes>;
        form: ReactComponentFactory<FormAttributes>;
        h1: ReactComponentFactory<HTMLGlobalAttributes>;
        h2: ReactComponentFactory<HTMLGlobalAttributes>;
        h3: ReactComponentFactory<HTMLGlobalAttributes>;
        h4: ReactComponentFactory<HTMLGlobalAttributes>;
        h5: ReactComponentFactory<HTMLGlobalAttributes>;
        h6: ReactComponentFactory<HTMLGlobalAttributes>;
        head: ReactComponentFactory<HTMLGlobalAttributes>;
        header: ReactComponentFactory<HTMLGlobalAttributes>;
        hr: ReactComponentFactory<HTMLGlobalAttributes>;
        html: ReactComponentFactory<HTMLGlobalAttributes>;
        i: ReactComponentFactory<HTMLGlobalAttributes>;
        iframe: ReactComponentFactory<IframeAttributes>;
        img: ReactComponentFactory<ImgAttributes>;
        input: ReactComponentFactory<InputAttributes>;
        ins: ReactComponentFactory<InsAttributes>;
        kbd: ReactComponentFactory<HTMLGlobalAttributes>;
        keygen: ReactComponentFactory<KeygenAttributes>;
        label: ReactComponentFactory<LabelAttributes>;
        legend: ReactComponentFactory<HTMLGlobalAttributes>;
        li: ReactComponentFactory<LiAttributes>;
        link: ReactComponentFactory<LinkAttributes>;
        main: ReactComponentFactory<HTMLGlobalAttributes>;
        map: ReactComponentFactory<MapAttributes>;
        mark: ReactComponentFactory<HTMLGlobalAttributes>;
        menu: ReactComponentFactory<MenuAttributes>;
        menuitem: ReactComponentFactory<HTMLGlobalAttributes>;
        meta: ReactComponentFactory<MetaAttributes>;
        meter: ReactComponentFactory<MeterAttributes>;
        nav: ReactComponentFactory<HTMLGlobalAttributes>;
        noscript: ReactComponentFactory<HTMLGlobalAttributes>;
        object: ReactComponentFactory<ObjectAttributes>;
        ol: ReactComponentFactory<HTMLGlobalAttributes>;
        optgroup: ReactComponentFactory<HTMLGlobalAttributes>;
        option: ReactComponentFactory<OptionAttributes>;
        output: ReactComponentFactory<OutputAttributes>;
        p: ReactComponentFactory<HTMLGlobalAttributes>;
        param: ReactComponentFactory<ParamAttributes>;
        pre: ReactComponentFactory<HTMLGlobalAttributes>;
        progress: ReactComponentFactory<ProgressAttributes>;
        q: ReactComponentFactory<HTMLGlobalAttributes>;
        rp: ReactComponentFactory<HTMLGlobalAttributes>;
        rt: ReactComponentFactory<HTMLGlobalAttributes>;
        ruby: ReactComponentFactory<HTMLGlobalAttributes>;
        s: ReactComponentFactory<HTMLGlobalAttributes>;
        samp: ReactComponentFactory<HTMLGlobalAttributes>;
        script: ReactComponentFactory<ScriptAttributes>;
        section: ReactComponentFactory<HTMLGlobalAttributes>;
        select: ReactComponentFactory<SelectAttributes>;
        small: ReactComponentFactory<HTMLGlobalAttributes>;
        source: ReactComponentFactory<SourceAttributes>;
        span: ReactComponentFactory<HTMLGlobalAttributes>;
        strong: ReactComponentFactory<HTMLGlobalAttributes>;
        style: ReactComponentFactory<StyleAttributes>;
        sub: ReactComponentFactory<HTMLGlobalAttributes>;
        summary: ReactComponentFactory<HTMLGlobalAttributes>;
        sup: ReactComponentFactory<HTMLGlobalAttributes>;
        table: ReactComponentFactory<TableAttributes>;
        tbody: ReactComponentFactory<HTMLGlobalAttributes>;
        td: ReactComponentFactory<TdAttributes>;
        textarea: ReactComponentFactory<TextareaAttributes>;
        tfoot: ReactComponentFactory<HTMLGlobalAttributes>;
        th: ReactComponentFactory<ThAttributes>;
        thead: ReactComponentFactory<HTMLGlobalAttributes>;
        time: ReactComponentFactory<TimeAttributes>;
        title: ReactComponentFactory<HTMLGlobalAttributes>;
        tr: ReactComponentFactory<HTMLGlobalAttributes>;
        track: ReactComponentFactory<TrackAttributes>;
        u: ReactComponentFactory<HTMLGlobalAttributes>;
        ul: ReactComponentFactory<HTMLGlobalAttributes>;
        var: ReactComponentFactory<HTMLGlobalAttributes>;
        video: ReactComponentFactory<VideoAttributes>;
        wbr: ReactComponentFactory<HTMLGlobalAttributes>;
        //svg elements
        circle: ReactComponentFactory<SVGAttributes>;
        g: ReactComponentFactory<SVGAttributes>;
        line: ReactComponentFactory<SVGAttributes>;
        path: ReactComponentFactory<SVGAttributes>;
        polygon: ReactComponentFactory<SVGAttributes>;
        polyline: ReactComponentFactory<SVGAttributes>;
        rect: ReactComponentFactory<SVGAttributes>;
        svg: ReactComponentFactory<SVGAttributes>;
        text: ReactComponentFactory<SVGAttributes>;
    }
}

/**
 * A function that produces ReactElements of a given type.
 * Similar to React.createElement.
 * 
 * @param type      Can be either an html tag name string or a ReactClass
 */
interface FactoryFunction {
    (props: Object, children?: any): ReactElement
}

/**
 * The result of React.createElement, which is rendered into the DOM.
 */
interface ReactElement extends Element, ReactComponent { }

/**
 * Component classes are another abstraction of components. React.createClass creates the class
 * and React.createElement uses the ReactClass to instantiate an actual component.
 */
interface ReactComponent extends ReactClass { }
    
/**
 * Component classes created by createClass() return instances of ReactComponent when called.
 * Most of the time when you're using React you're either creating or consuming these component objects.
 */
interface ReactClass {
    props: {};
    state: {};

    /**
     * Collection of named elements returned from render().
     */
    refs: { [ref: string]: ReactComponent; };

	/**
	 * If this component has been mounted into the DOM, this returns the corresponding native browser DOM element.
	 * This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements.
	 */
	getDOMNode(): HTMLElement;

    /**
     * When you're integrating with an external JavaScript application you may want to signal a change to a React component rendered with renderComponent().
     * Simply call setProps() to change its properties and trigger a re-render.
     *
     * @param nextProps the object that will be merged with the component's props
     * @param callback an optional callback function that is executed once setProps is completed.
     */
    setProps(nextProps: Object, callback?: Function): void;

    /**
     * Like setProps() but deletes any pre-existing props instead of merging the two objects.
     *
     * @param nextProps the object that will replace the component's props
     * @param callback an optional callback function that is executed once replaceProps is completed.
     */
    replaceProps(nextProps: Object, callback?: Function): void;

    /**
     * Transfer properties from this component to a target component that have not already been set on the target component.
     * After the props are updated, targetComponent is returned as a convenience.
     *
     * @param target the component that will receive the props
     */
    transferPropsTo(target: ReactComponent): ReactComponent;

    /**
     * Merges nextState with the current state.
     * This is the primary method you use to trigger UI updates from event handlers and server request callbacks.
     * In addition, you can supply an optional callback function that is executed once setState is completed.
     *
     * @param nextState the object that will be merged with the component's state
     * @param callback an optional callback function that is executed once setState is completed.
     */
    setState(nextState: Object, callback?: Function): void;

    /**
     * Like setState() but deletes any pre-existing state keys that are not in nextState.
     *
     * @param nextState the object that will replace the component's state
     * @param callback an optional callback function that is executed once replaceState is completed.
     */
    replaceState(nextState: Object, callback?: Function): void;

    /**
     * If your render() method reads from something other than this.props or this.state,
     * you'll need to tell React when it needs to re-run render() by calling forceUpdate().
     * You'll also need to call forceUpdate() if you mutate this.state directly.
     * Calling forceUpdate() will cause render() to be called on the component and its children,
     * but React will still only update the DOM if the markup changes.
     * Normally you should try to avoid all uses of forceUpdate() and only read from this.props and this.state in render().
     * This makes your application much simpler and more efficient.
     *
     * @param callback an optional callback that is executed once forceUpdate is completed.
     */
    forceUpdate(callback?: Function): void;

    /**
     * Returns true if the component is rendered into the DOM, false otherwise.
     * You can use this method to guard asynchronous calls to setState() or forceUpdate().
     */
    isMounted(): boolean;
}

interface Attributes { }

interface ReactComponentFactory<Attributes> {
    (properties?: Attributes, ...children: any[]): ReactComponent;
}

interface ComponentSpec {
    /**
     * The render() method is required. When called, it should examine this.props and this.state and return a single child component.
     * This child component can be either a virtual representation of a native DOM component (such as <div /> or React.DOM.div())
     * or another composite component that you've defined yourself.
     * The render() function should be pure, meaning that it does not modify component state, it returns the same result each time it's invoked,
     * and it does not read from or write to the DOM or otherwise interact with the browser (e.g., by using setTimeout).
     * If you need to interact with the browser, perform your work in componentDidMount() or the other lifecycle methods instead.
     * Keeping render() pure makes server rendering more practical and makes components easier to think about.
     */
    render(): ReactComponent;

    /**
     * Invoked once before the component is mounted. The return value will be used as the initial value of this.state.
     */
    getInitialState?(): Object;

    /**
     * Invoked once when the component is mounted.
     * Values in the mapping will be set on this.props if that prop is not specified by the parent component (i.e. using an in check).
     * This method is invoked before getInitialState and therefore cannot rely on this.state or use this.setState.
     */
    getDefaultProps?(): Object;

    /**
     * The propTypes object allows you to validate props being passed to your components.
     */
    propTypes?: React.PropTypeValidatorOptions;

    /**
     * The mixins array allows you to use mixins to share behavior among multiple components.
     */
    mixins?: Object[];

    /**
     * Allows you to define static methods that can be called on the component class.
     */
    statics?: Object;

    /**
     * The displayName string is used in debugging messages. JSX sets this value automatically.
     */
    displayName?: string;

    /**
     * Invoked immediately before rendering occurs.
     * If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.
     */
    componentWillMount?(): void;

    /**
     * Invoked immediately after rendering occurs.
     * At this point in the lifecycle, the component has a DOM representation which you can access via the rootNode argument or by calling this.getDOMNode().
     * If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval,
     * or send AJAX requests, perform those operations in this method.
     */
    componentDidMount?(): void;

    /**
     * Invoked when a component is receiving new props. This method is not called for the initial render.
     *
     * Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState().
     * The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.
     *
     * @param nextProps the props object that the component will receive
     */
    componentWillReceiveProps?(nextProps: Object): void;

    /**
     * Invoked before rendering when new props or state are being received.
     * This method is not called for the initial render or when forceUpdate is used.
     * Use this as an opportunity to return false when you're certain that the transition to the new props and state will not require a component update.
     * By default, shouldComponentUpdate always returns true to prevent subtle bugs when state is mutated in place,
     * but if you are careful to always treat state as immutable and to read only from props and state in render()
     * then you can override shouldComponentUpdate with an implementation that compares the old props and state to their replacements.
     *
     * If performance is a bottleneck, especially with dozens or hundreds of components, use shouldComponentUpdate to speed up your app.
     *
     * @param nextProps the props object that the component will receive
     * @param nextState the state object that the component will receive
     */
    shouldComponentUpdate?(nextProps: Object, nextState: Object): void;

    /**
     * Invoked immediately before rendering when new props or state are being received. This method is not called for the initial render.
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * @param nextProps the props object that the component has received
     * @param nextState the state object that the component has received
     */
    componentWillUpdate?(nextProps: Object, nextState: Object): void;

    /**
     * Invoked immediately after updating occurs. This method is not called for the initial render.
     * Use this as an opportunity to operate on the DOM when the component has been updated.
     *
     * @param nextProps the props object that the component has received
     * @param nextState the state object that the component has received
     */
    componentDidUpdate? (prevProps: Object, prevState: Object): void;

    /**
     * Invoked immediately before a component is unmounted from the DOM.
     * Perform any necessary cleanup in this method, such as invalidating timers or cleaning up any DOM elements that were created in componentDidMount.
     */
    componentWillUnmount? (): void;
}

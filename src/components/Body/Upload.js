import React , {useEffect, useState , useCallback} from 'react'
import { connect } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { actionLoadFile, actionTrackFindOne, actionUpdatePlaylist } from '../../actions/Actions'

function UploadFile({onLoad}) {
    
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map((item) => {
          onLoad(item)
      })

     }, [onLoad])

     
    const {getRootProps, getInputProps, isDragActive , acceptedFiles} = useDropzone({onDrop})
    
  return (
    <div {...getRootProps()} className=" dropzone">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
          
      }
       {/* {
          acceptedFiles ? 
            acceptedFiles.map(file => (
                <div className='dropzone__list'>
                    <li key={file.path}>
                            {file.path} - {file.size} bytes
                    </li>
                </div>
            )) : 'files'
      } */}
    </div>
    
    )
  }

  export const CUploadFile = connect(state => ({

  }
    ),
    {
        onLoad: actionLoadFile,
        findTrack: actionTrackFindOne
    })(UploadFile)


    // const Item = ({data:{name}}) =>
    // <div style={{backgroundColor: 'yellow', fontSize: '2em', padding: '20px', borderRadius: '10px', margin: '10px'}}>
    //     {name}
    // </div>

// const SortableItem = (props) => {
//     const {
//       attributes,
//       listeners,
//       setNodeRef,
//       transform,
//       transition
//     } = useSortable({ id: props.id });
  
//     const itemStyle = {
//       transform: CSS.Transform.toString(transform),
//       transition,
//       //width: 110,
//       //height: 30,
//       //display: "flex",
//       //alignItems: "center",
//       //paddingLeft: 5,
//       //border: "1px solid gray",
//       //borderRadius: 5,
//       //marginBottom: 5,
//       //userSelect: "none",
//       cursor: "grab",
//       //boxSizing: "border-box"
//     };
      
//       const Render = props.render
  
//     return (
//       <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
//         <Render {...{[props.itemProp]:props.item}}/>
//       </div>
//     );
//   };
  
  
//   const Droppable = ({ id, items, itemProp, keyField, render }) => {
//     const { setNodeRef } = useDroppable({ id });
  
//     const droppableStyle = {
//       //padding: "20px 10px",
//       //border: "1px solid black",
//       //borderRadius: "5px",
//       //minWidth: 110
//     };
  
//     return (
//       <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
//           {items.map((item) => (
//             <SortableItem render={render} key={item[keyField]} id={item} 
//                           itemProp={itemProp} item={item}/>
//           ))}
//       </SortableContext>
//     );
//   };
  
  
//   function Dnd({items:startItems,render, itemProp, keyField, onChange, horizontal}) {
//       const [items, setItems] = useState(
//           startItems
//       );
  
//       useEffect(() => setItems(startItems), [startItems])
  
//       useEffect(() => {
//           if (typeof onChange === 'function'){
//               onChange(items)
//           }
//       },[items])
  
//       const sensors = useSensors(
//           useSensor(PointerSensor),
//           useSensor(KeyboardSensor, {
//               coordinateGetter: sortableKeyboardCoordinates
//           })
//       );
  
//       const handleDragEnd = ({ active, over }) => {
//           const activeIndex = active.data.current.sortable.index;
//           const overIndex = over.data.current?.sortable.index || 0;
  
//           setItems((items) => {
//               return arrayMoveImmutable( items, activeIndex, overIndex)
//           });
//       }
  
//       const containerStyle = { display: horizontal ? "flex" : '' };
  
//     return (
//       <DndContext
//         sensors={sensors}
//         onDragEnd={handleDragEnd}
//       >
//         <div style={containerStyle}>
//             <Droppable id="aaa" 
//                        items={items} 
//                        itemProp={itemProp} 
//                        keyField={keyField} 
//                        render={render}/>
//         </div>
//       </DndContext>
//     );
//   }
  
//   const data = [{name: 'aaa', _id: 'a1'},{name: 'bbb', _id: 'b2'}, {name: 'ccc', _id: 'c3'}]
  
//   function App() {
//       return (
//           <Provider store={store}>
//               <Router history = {history}>
                //   <Dnd items={data} render={Item} itemProp="data" keyField="_id"
                //        onChange={newArray => console.log('new array', newArray)} 
                //       />
//                   <CAside />
//                   <Content />
//               </Router>
//           </Provider>
//       );
//   }
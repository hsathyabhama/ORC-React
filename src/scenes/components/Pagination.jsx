import React, {Component} from 'react';
import './styles/paginationStyle.css'

class Pagination extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        todos: new Array(this.props.totalRecords),
        // currentPage: 1,
        // todosPerPage: 3,
        currentPage: 1,
        todosPerPage: this.props.recordsPerPage,
        upperPageBound: 3,
        lowerPageBound: 0,
        isPrevBtnActive: 'disabled',
        isNextBtnActive: '',
        pageBound: 3,
        // recordSize: 10,
      };
      this.handleClick = this.handleClick.bind(this);
      this.btnDecrementClick = this.btnDecrementClick.bind(this);
      this.btnIncrementClick = this.btnIncrementClick.bind(this);
      this.btnNextClick = this.btnNextClick.bind(this);
      this.btnPrevClick = this.btnPrevClick.bind(this);
      // this.componentDidMount = this.componentDidMount.bind(this);
      this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({todos: new Array(nextProps.totalRecords), todosPerPage: nextProps.recordsPerPage}); 
    }

    componentDidUpdate() {
        //   $("ul li.active").removeClass('active');
        //   $('ul li#'+this.state.currentPage).addClass('active');
    }

    changeRecordSize = (event) => {
      // this.setState({recordSize: event.target.value});
      this.props.paginateRecordSize(event.target.value);
  }

    handleClick(event) {
      let listid = Number(event.target.id);
      this.setState({
        currentPage: listid
      });
    //   $("ul li.active").removeClass('active');
    //   $('ul li#'+listid).addClass('active');
      this.setPrevAndNextBtnClass(listid);
      this.props.paginate(listid);
    }
    setPrevAndNextBtnClass(listid) {
      let totalPage = Math.ceil(this.state.todos.length / this.state.todosPerPage);
      this.setState({isNextBtnActive: 'disabled'});
      this.setState({isPrevBtnActive: 'disabled'});
      if(totalPage === listid && totalPage > 1){
          this.setState({isPrevBtnActive: ''});
      }
      else if(listid === 1 && totalPage > 1){
          this.setState({isNextBtnActive: ''});
      }
      else if(totalPage > 1){
          this.setState({isNextBtnActive: ''});
          this.setState({isPrevBtnActive: ''});
      }
  }
    btnIncrementClick() {
        this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
        this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtnClass(listid);
        this.props.paginate(listid);
  }
    btnDecrementClick() {
      this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
      this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
      let listid = this.state.upperPageBound - this.state.pageBound;
      this.setState({ currentPage: listid});
      this.setPrevAndNextBtnClass(listid);
      this.props.paginate(listid);
  }
  btnPrevClick() {
      if((this.state.currentPage -1)%this.state.pageBound === 0 ){
          this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
      }
      let listid = this.state.currentPage - 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
      this.props.paginate(listid);
  }
  btnNextClick() {
      if((this.state.currentPage +1) > this.state.upperPageBound ){
          this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
          this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
      }
      let listid = this.state.currentPage + 1;
      this.setState({ currentPage : listid});
      this.setPrevAndNextBtnClass(listid);
      this.props.paginate(listid);
  }
    render() {
      const { todos, currentPage, todosPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
      // Logic for displaying current todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

      // const renderTodos = currentTodos.map((todo, index) => {
      //   return <li key={index}>{todo}</li>;
      // });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
          if(number === 1 && currentPage === 1){
              return(
                  <li key={number} className='active' id={number}><a class="pageNav" href='#' id={number} onClick={this.handleClick}>{number}</a></li>
              )
          }
          else if((number < upperPageBound + 1) && number > lowerPageBound){
              return(
                  <li class={(this.state.currentPage === number)?'active':''} key={number} id={number}><a class="pageNav" href='#' id={number} onClick={this.handleClick}>{number}</a></li>
              )
          }
      });
      let pageIncrementBtn = null;
      if(pageNumbers.length > upperPageBound){
          pageIncrementBtn = <li className=''><a class="pageNav" href='#' onClick={this.btnIncrementClick}> &hellip; </a></li>
      }
      let pageDecrementBtn = null;
      if(lowerPageBound >= 1){
          pageDecrementBtn = <li className=''><a class="pageNav" href='#' onClick={this.btnDecrementClick}> &hellip; </a></li>
      }
      let renderPrevBtn = null;
      if(isPrevBtnActive === 'disabled') {
          renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev"> Prev </span></li>
      }
      else{
          renderPrevBtn = <li className={isPrevBtnActive}><a class="pageNav" href='#' id="btnPrev" onClick={this.btnPrevClick}> Prev </a></li>
      }
      let renderNextBtn = null;
      if(isNextBtnActive === 'disabled') {
          renderNextBtn = <li className={isNextBtnActive}><span id="btnNext"> Next </span></li>
      }
      else{
          renderNextBtn = <li className={isNextBtnActive}><a class="pageNav" href='#' id="btnNext" onClick={this.btnNextClick}> Next </a></li>
      }
      return (
        <div>
            {/* <ul>
            {renderTodos}
          </ul> */}
          <ul id="page-numbers" className="pagination">
          <div>No of Records :</div>
          <select style={{width:'auto', color: '#000', marginRight: '10px', marginLeft: '10px'}} onChange={this.changeRecordSize}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
            </select>
            {renderPrevBtn}
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            {renderNextBtn}
          </ul>
        </div>
      );
    }
  }
export default Pagination;
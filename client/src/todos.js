let todo = new Vue({
  el: "#todos",
  data: {
    contentmu: '',
    daftar: [],
    types: 'text',
    inputIsEditable: [],
    contentedit: '',
    editan: "",
    ganti: '',
    sayname: '',
    youtube: '',
    isi: []

  },

  methods: {

    showYT: function () {
      this.isi = []
      axios({
          method: 'get',
          url: `http://localhost:3000/youtube/search`,
          headers: {
            find: this.youtube
          }
        })
        .then(function (data) {
          todo.isi = (data.data)
          todo.youtube = ''
          console.log(todo.youtube, 'sksks')

          console.log(',,,,', todo.isi)
        })
        .catch(function (err) {
          console.log(err)
        })



    },
    saveedit(id) {
      axios({
          method: 'put',
          url: `http://localhost:3000/todo/update/${id}`,
          data: {
            content: document.getElementById(id).value
          }
        })
        .then(function (updates) {
          todo.getlist()
          console.log(updates)
        })
        .catch(function (err) {
          console.log(err)
        })


    },


    edited: function (payload) {
      const isEditable = this.inputIsEditable[payload.index]
      this.inputIsEditable.splice(payload.index, 1, !isEditable);
      if (!isEditable) {
        const id = payload.id;
        const content = document.getElementById(id).value
        console.log('bi id:', content)
        console.log('bi refs: ', this.$refs.id)
        console.log('bi refs: ', this.$refs[id])
      } else {
        //nothing to do
      }
    },


    logouts: function () {
      if (localStorage.hasOwnProperty('fbtoken')) {
        FB.logout(function (response) {
          console.log('ini response logouts:', response)
          alert('You have beeen logged out! ');
          localStorage.clear()
          window.location.reload();
        })

      } else {
        localStorage.clear()
        window.location.reload();
      }
      console.log('logouu')
    },

    getlist: function () {
      console.log('getlist')
      axios({
          method: 'get',
          url: 'http://localhost:3000/todo',
          headers: {
            tokenapp: localStorage.getItem('tokenapp')
          }
        })
        .then(function (list) {
          console.log('ini list nya nih', list);
          todo.daftar = list.data
          // todo.sayname = list.data.nama.username
          // console.log('stringify', JSON.stringify(list))
          // Initial input state
          const values = [];
          for (let i = 0; i < todo.daftar.length; i++) {
            values.push(false);
          }
          todo.inputIsEditable = values;
        })
    },



    addtodo: function () {
      console.log('add to do ')
      axios({
          method: 'post',
          url: 'http://localhost:3000/todo/add',
          data: {
            content: this.contentmu
          },
          headers: {
            tokenapp: localStorage.getItem('tokenapp')
          }
        })
        .then(function (dataTodo) {
          console.log(dataTodo)
          todo.contentmu = '';
          todo.getlist()
        })
        .catch(function (err) {
          console.log(err)
        })
    },


    deletedata: function (ids) {
      console.log(ids)
      console.log('trie delete')
      axios({
          method: 'delete',
          url: `http://localhost:3000/todo/delete/${ids}`,
          headers: {
            tokenapp: localStorage.getItem('tokenapp')
          }
        })
        .then(function (data) {
          console.log('deletes')
          console.log(data)
          todo.getlist()
          // window.location.href = 'http://localhost:8080/todo.html'
        })
        .catch(function (err) {
          console.log(err)
        })

    },


  },
  created: function () {
    console.log('created loaded:')
    if (!localStorage.hasOwnProperty('tokenapp')) {
      console.log('ada toke')
      window.location.href = 'http://localhost:8080/index.html'
    }
    this.getlist()
    if (todo.isi.length !== 0) {
      this.showYT()
      this.youtube = ''
    }
  }
})

export default {
	//深拷贝
	deepCopy (obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	//浅拷贝
	shallowCopy (obj, {date, array, skip}) {
		
		const data = {};
		if( date === undefined ) date = false;
		if( array === undefined ) array = false;
		if( skip === undefined ) skip = [];

		for(let k in obj) {
      const d = obj[k];
      if(date && d instanceof Date) {
        data[k] = this.getDate(d);
      }else if(array && d instanceof Array) {
      	data[k] = d.join(',');
      }else if(skip.length != 0 && skip.indexOf(k) >= 0) {
      	continue;
      }else {
        data[k] = d;
      }
    }

        return data;
	},
	//清空对象
	clearObj (obj) {
		for(let key in obj) {
			if(typeof obj[key] === 'object') {
				obj[key] = [];
			}else {
				obj[key] = '';
			}
		}
		return obj;
	},
	//获取日期
	getDate (date) {
		if(date instanceof Date) {
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		}else {
			return date;
		}
		
	},
	coverObj (a1, a2, { obj, skip } = {}) {
		
		const map = new Map();
		const skip_map = new Map();
		if(obj) {
			if(obj.arr) {
				obj.arr.forEach(_=>{ map.set(_, true) });
			}else {
				obj.forEach(_=>{ map.set(_, true) });
			}
		
		}
		if(skip) {
			skip.forEach(_=>{ skip_map.set(_, true) });
		}
		const k = obj.key;
		for (let key in a1) {
			const v = a2[key];

			if(v === undefined) continue;
			if(skip && skip_map.get(key)) {
				continue;
			}else if( obj && typeof v == 'object' && map.get(key) ) {
				
				if( Array.isArray(v) ) {
					a1[key] = k ? v.map(_=>_[k]) : v.map(_=>_.id);
				}else {
					a1[key] = k ? v[k] : v.id;	
				}
			}else {
				a1[key] = v == undefined ? a1[key] : v;	
			}
				
		}
		return a1;
	},
	searchTree (arr, id) {

		return f(arr);

		function f(a) {
			let i = a.length;
			while( i-- ) {
				const d = a[i];
				if(d.id == id) {
					return {arr: a, index: i};
				}else if(d.children && d.children.length != 0) {
					const o  = f(d.children);
					if(o) {
						return o;
					}
				}
			}
		}
	},
	//arr = [{id:1,name: 'aaa'},{id: 2, name: 'bbb'}];
	
	//splitObj(arr, ['id','name']) = {'id': [1,2], 'name': ['aaa','bbb']};
	//splitObj(arr, 'id') = [1,2];
	splitObj (arr, keys) {
		let result;
		if(keys instanceof Array) {
			result = {};
			for(let k of keys) {
				result[k] = [];
			}

			for(let a of arr) {
				for(let k of keys) {
					result[k].push(a[k]);
				}
			}	
		}else if(typeof keys == 'string') {
			result = [];
			for(let a of arr) {
				result.push(a[keys]);
			}
		}
		

		return result;
	},
	getUrlParams (obj) {

		const arr = [];
		for(let k in obj) {

			const d = obj[k];
			if(d instanceof Array) {
				d.forEach(_=>{arr.push(`${encodeURIComponent(k)}[]=${encodeURIComponent(_)}`)});
			}else {
				arr.push(`${encodeURIComponent(k)}=${encodeURIComponent(d)}`)	
			}			
		}

		return arr.join('&');
	},
	setCookie (name,value) {
		if( name === undefined || !(typeof name === 'string') ) { return;}

	    var Days = 30;
	    var exp = new Date();
	    exp.setTime(exp.getTime() + Days*24*60*60*1000);
	    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
	getCookie (name) {
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
	    if(arr=document.cookie.match(reg)){
	      return unescape(arr[2]);
	    }
	    else{
	     return null;
	    }
	},
	delCookie (name) {
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=getCookie(name);
	    if(cval!=null){
	      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	    }
	},
	//设置LocalStorage
	setLocal (name, value) {
		if( name === undefined || !(typeof name === 'string') ) return;

		window.localStorage.setItem(name, escape(value));
	},
	getLocal (name) {
		if(window.localStorage.getItem(name)) {
			return unescape(window.localStorage.getItem(name));
		}else {
			return null;
		}
	},
	deleteLocal (name) {
		window.localStorage.removeItem(name);
	},
	windowChangeUrl (string) {
		if (!window.location.origin) {
        	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    	}

    	window.location.href = `${window.location.origin}/${string}`;
	},
	detectionTime (time) {
		let str = '';
		if(time) {

			const now_time = new Date().getTime();
			const in_time = new Date(time.split(' ')[0]).getTime() + 8.64e7;
			const n = in_time - now_time;

			str = (n > 8.64e7 && n < 3*8.64e7 && 'danger') || (n < 8.64e7 && 'warning') || 'safety';
		}

		return str;
	},
	getObjLength (obj) {
		let i = 0;
		for(let k in obj)  i++; 

		return i;
	},
	singleObject (arr, key) {
		if(arr.length == 0 || !key ) return arr;

		const map = new Map();
		arr.forEach( _=>{map.set(_[key],_)} );
		return [...map.values()]; 
	},
	funcBefore (fn, beforefn) {

		return function(){
			beforefn.apply( this, arguments );
			return fn.apply( this, arguments );
		}
	},
	funcAfter (fn, afterfn) {

		return function() {
			const result = fn.apply( this, arguments );
			afterfn.apply( this, arguments );
			return result;
		}
	}
}
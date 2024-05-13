class Chart {
    constructor(label=[],datasets=[]){
        this.label=label;
        this.datasets=datasets;
    }
}
class OwnChart{
    chr = new Chart();
    constructor(config){
        this.canvas = config.host;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.type="line";
        this.w=500;
        this.h=500;
        this.addItem();
        this.render();
        this.blocks(this.chr.datasets,this.type);
        this.oran;

    }
    addItem(){
        this.chr =(new Chart(
            this.label = ["d1","d2","d3","d4"],
            this.datasets=[["s1", [30,330,400,80],"purple"],["s2",[220,320,80,140],"orange"],["s3", [80,150,400,1000],"red"]]
        ));
    }
    render(){
        let ara=0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.datasets.forEach((set)=>{
          set[1].forEach((s)=>{
            if(ara<s)
            ara=s;
          });  
        });
        this.oran=ara/this.h;

        this.ctx.beginPath();
        let bas=0;
        for(let i=0; i<this.label.length; i++){ 
            bas += (this.w/this.label.length) ;
            let yazi = bas - this.w/this.label.length/2
            this.ctx.fillText(this.label[i], yazi, this.h+10);
        }
        let h=this.h/5;
        for(let i=1;i<=5;i++){
            this.ctx.moveTo(20,h*i);
            this.ctx.lineTo(this.w+100,h*i);
            this.ctx.fillText(parseFloat(h*(5-i)*this.oran).toFixed(0), 0, h*i);
        }
        this.ctx.strokeStyle="black";
        this.ctx.lineWidth=2;
        this.ctx.moveTo(20,this.h);
        this.ctx.lineTo(this.w+50,this.h);
        this.ctx.moveTo(20,this.h);
        this.ctx.lineTo(20,10);
        this.ctx.stroke();
    }
    blocks(dataset,type){              
        if(type=="bar"){
            let gen = this.w/this.label.length;
            gen = gen-20;
            gen = gen/dataset.length;
            let bas=20;
            for(let i=0; i<dataset.length;i++){
                let bass=10;
                bass = bas+gen*i+bass;
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.fillStyle=dataset[i][2];
                dataset[i][1].forEach((s)=>{
                    this.ctx.rect(bass, this.h, gen-10, -s/this.oran);
                    bass = bas+ bass +(this.w/this.label.length) ;
                    
                })
                this.ctx.fill();
                this.ctx.restore();
            }
        }
        else if (type=="line"){
            let bas;
            for(let i=0; i<dataset.length;i++){
                bas=30;
                bas += (this.w/this.label.length) ;
                bas = bas - this.w/this.label.length/2;
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.strokeStyle=dataset[i][2];
                for(let j=0; j<dataset[i][1].length-1;j++){console.log(dataset[i][1][j]*this.oran,dataset[i][1][j+1]*this.oran);
                    this.ctx.moveTo(bas,this.h-dataset[i][1][j]/this.oran);
                    bas += (this.w/this.label.length) ;
                    this.ctx.lineTo(bas,this.h-dataset[i][1][j+1]/this.oran);
                }
                this.ctx.stroke();
                this.ctx.restore();
            }
        }
        
    }
}
const own = new OwnChart({
    host: document.getElementById("myBarChart")
});
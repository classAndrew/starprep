function Script() {
 async function startRecording(){
    const   stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
 }
  return (
    <div>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          eget lobortis mi, at finibus massa. Praesent mattis posuere libero et
          auctor. Donec consequat augue sit amet tortor maximus sagittis.
          Praesent nulla felis, placerat et ex non, mollis pretium magna. Sed
          mattis nunc nec ipsum interdum tempus. Aliquam vulputate finibus metus
          sit amet pharetra. Vestibulum at turpis pretium, pretium magna ut,
          facilisis felis. Suspendisse mollis nunc ut odio euismod pellentesque.
          Donec non enim quis nunc sagittis mattis in quis massa. Fusce mollis,
          est a dapibus dictum, magna turpis tincidunt tellus, vitae dictum
          augue justo in purus. Proin dignissim tellus efficitur lacus malesuada
          imperdiet. Phasellus sit amet libero a quam fermentum vulputate. Nulla
          facilisi. Suspendisse nec nisi ut felis pellentesque lobortis vitae
          eget urna. Morbi vehicula ex augue, a hendrerit lacus dapibus at.
          Integer id mauris tempus mi semper volutpat et feugiat metus. Donec
          mollis, eros in molestie malesuada, velit leo scelerisque sapien,
          dignissim molestie nisl enim ut augue. Proin in velit sit amet neque
          imperdiet lacinia ut placerat nibh. Duis vitae porta lorem.
        </p>

      </div>

      <div>
        <button>Start Recording Voice</button>
      </div>
    </div>
  );
}
export default Script;
